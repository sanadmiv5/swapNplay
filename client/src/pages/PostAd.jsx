import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Form, Row } from 'react-bootstrap'
import '../styles/contact.css'
import ContactInput from '../components/ContactInput'
import { FileUpload } from '../components/FileUpload'
import { postAd } from '../redux/ads/adsSlice'
import toast from 'react-hot-toast'
import { ThreeDots } from 'react-loader-spinner'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

const PostAd = () => {
  const [value, setValue] = useState(null)
  const [allValues, setAllValues] = useState({
    title: '',
    description: '',
    brand: '',
    condition: 'New',
    category: 'Mobile Phones',
    price: null,
    image: null,
  })

  const dispatch = useDispatch()
  const { errorMessage, successMessage, isError, isSuccess, isLoading } =
    useSelector((selector) => selector.ads)

  useEffect(() => {
    if (isError && errorMessage) {
      toast.error(errorMessage)
    }

    if (isSuccess && successMessage) {
      toast.success(successMessage)
    }
  }, [isError, isSuccess, errorMessage, successMessage, dispatch])

  const handleChange = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value })
  }

  const dropDownChange = (e) => {
    setAllValues({ ...allValues, condition: e.target.value })
  }

  const categoryDropdownChange = (e) => {
    setAllValues({ ...allValues, category: e.target.value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.size <= 100 * 1024) { // Check if file is less than 100KB
      const reader = new FileReader()
      reader.onloadend = () => {
        setAllValues((prevValues) => ({
          ...prevValues,
          image: reader.result // Set image URL
        }))
      }
      reader.readAsDataURL(file)
    } else {
      toast.error('File must be less than 100KB')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!allValues.image) {
      toast.error('Please upload an image')
      return
    }

    dispatch(postAd(allValues))

    setAllValues({
      title: '',
      description: '',
      brand: '',
      condition: 'New',
      category: 'Mobile Phones',
      price: null,
      image: null,
    })
  }

  if (isLoading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ThreeDots color="#3a77ff" height={100} width={100} />
      </div>
    )
  }

  return (
    <div className="contact_page">
      <div className="cliped_bg"></div>
      <Container>
        <div className="contact_us_container">
          <h3 className="heading" style={{ color: '#fff' }}>
            POST YOUR AD
          </h3>
          <p className="description" style={{ color: '#fff' }}>
            If you don't use your toy or need to swap your toy with another one, you can just post your toy here.
            <br />
            Post your toy on this website and make money online.
          </p>

          <form
            className="contactform"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <Row className="g-2 gy-4">
              <ContactInput
                label="Ad title"
                placeholder="title..."
                name="title"
                handleChange={handleChange}
              />
              <ContactInput
                label="Description"
                placeholder="Add your ad description..."
                name="description"
                handleChange={handleChange}
              />
              {/* <ContactInput
                label="Brand"
                placeholder="e.g Apple, Samsung..."
                name="brand"
                handleChange={handleChange}
              /> */}

              {/* <div>
                <p className="input_label">Condition</p>
                <Form.Select onChange={dropDownChange} value={allValues.condition}>
                  <option value="New">New</option>
                  <option value="Open">Open</option>
                  <option value="Used">Used</option>
                  <option value="Refurbished">Refurbished</option>
                </Form.Select>
              </div> */}

              {/* <div>
                <p className="input_label">Categories</p>
                <Form.Select onChange={categoryDropdownChange} value={allValues.category}>
                  <option value="Mobile Phones">Mobile Phones</option>
                  <option value="Cars">Cars</option>
                  <option value="Motorcycles">Motorcycles</option>
                  <option value="Houses">Houses</option>
                  <option value="TV">TV</option>
                  <option value="Video - Audio">Video - Audio</option>
                  <option value="Tablets">Tablets</option>
                  <option value="Laptops">Laptops</option>
                  <option value="Land & Plots">Land & Plots</option>
                  <option value="Others">Others</option>
                </Form.Select>
              </div> */}

              <ContactInput
                label="SET A PRICE"
                placeholder="price..."
                type="number"
                name="price"
                handleChange={handleChange}
              />

              <div className="input-control">
                <label className="mb-2 text-uppercase">Upload Image</label>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                {allValues.image && (
                  <img
                    src={allValues.image}
                    alt="Preview"
                    style={{ width: '100px', marginTop: '10px' }}
                  />
                )}
              </div>

              {/* <div className="input-control">
                <label className="mb-2 text-uppercase">Enter your location</label>
                <GooglePlacesAutocomplete
                  selectProps={{
                    value,
                    onChange: setValue,
                  }}
                  autocompletionRequest={{
                    componentRestrictions: { country: ['pk'] },
                  }}
                />
              </div> */}
            </Row>

            <p className="agreement_heading">
              By submitting this form you agree to our terms and conditions and
              our Privacy Policy which explains how we may collect, use and
              disclose your personal information including to third parties.
            </p>

            <div>
              <Button style={{ background: '#333333' }} type="submit">
                Post Now
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default PostAd
