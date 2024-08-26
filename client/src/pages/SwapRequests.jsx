import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import MyAd from '../components/MyAd'
import { reset, swapList } from '../redux/ads/adsSlice'
import MySwaps from '../components/mySwaps'

const SwapRequests = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(swapList());
  }, [dispatch]);
  const { ads, isLoading, isError, successMessage, errorMessage } = useSelector((select) => select.ads);

useEffect(() => {
  console.log("Swap List Ads:", ads);
  console.log("Loading State:", isLoading);
  console.log("Error State:", isError);
  console.log("Error Message:", errorMessage);
  console.log("Success Message:", successMessage);
}, [ads, isLoading, isError, successMessage, errorMessage]);
  // useEffect(() => {
  //   return () => dispatch(reset())
  // }, [dispatch])

  return (
    <Container>
      <h1 className="mt-5 mb-3">Your swap list</h1>
      {ads?.data?.length > 0 ? (
        ads?.data?.map((ad) => <MySwaps ad={ad} />)
      ) : (
        <div style={{ height: '35vh' }}>
          <h1>Your swap list is empty</h1>
        </div>
      )}
    </Container>
  )
}

export default SwapRequests

