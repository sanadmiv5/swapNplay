import axios from 'axios'

const url = '/api/auth'

// POST ADS
const postAd = async (data) => {
  console.log('data2',data)
  const token = JSON.parse(localStorage.getItem('token'))
  const header = {
    Authorization: `Bearer ${token}`,
  }

  const ad = await axios({
    method: 'post',
    url: `${url}/add-product`,
    headers: header,
    data,
  })

  return ad.data
}

// GET ADS
const getAds = async () => {
  const ads = await axios.get(`${url}/all-products`)

  return ads.data
}

// GET ITEM USER
const getItemUser = async (userId) => {
  const user = await axios({
    method: 'post',
    url: `${url}/item/user`,
    data: { userId },
  })

  return user.data
}

// MY ADS
const myads = async () => {
  const token = JSON.parse(localStorage.getItem('token'))

  const header = {
    Authorization: `Bearer ${token}`,
  }

  const user = await axios({
    method: 'get',
    url: `${url}/user-products`,
    headers: header,
  })

  return user.data
}
// DELETE AD
const deleteAd = async (id) => {
  const token = JSON.parse(localStorage.getItem('token'))

  const header = {
    Authorization: `Bearer ${token}`,
  }

  const user = await axios({
    method: 'post',
    url: `${url}/delete-product/${id}`,
    headers: header,
  })

  return user.data
}
// UPDATE AD
const updateAd = async ({ id, ad }) => {
  console.log('edit prodduct api',ad)
  const token = JSON.parse(localStorage.getItem('token'))

  const header = {
    Authorization: `Bearer ${token}`,
  }

  const user = await axios({
    method: 'put',
    url: `${url}/edit-product/${id}`,
    data: ad,
    headers: header,
  })

  return user.data
}

// swap
const swapRequest = async ({ fromId, toId }) => {
  console.log('from to prodduct api',fromId, toId)
  const token = JSON.parse(localStorage.getItem('token'))

  const header = {
    Authorization: `Bearer ${token}`,
  }

  const user = await axios({
    method: 'post',
    url: `${url}/request-swap`,
    data: {fromProductId: fromId, toProductId: toId},
    headers: header,
  })

  return user.data
}

// swap llst
const swapList = async () => {
  const token = JSON.parse(localStorage.getItem('token'))

  const header = {
    Authorization: `Bearer ${token}`,
  }

  const swapList = await axios({
    method: 'get',
    url: `${url}/swap-list`,
    headers: header,
  })
console.log("swapList",swapList.data)
  return swapList.data
}

//approve swap
const approveSwap = async (id, data) => {
  console.log('data2',data)
  const token = JSON.parse(localStorage.getItem('token'))
  const header = {
    Authorization: `Bearer ${token}`,
  }

  const ad = await axios({
    method: 'put',
    url: `${url}/respond-swap/${id}`,
    headers: header,
    data,
  })

  return ad.data
}


// add Giveaway
const addGiveaway = async (id) => {
  const token = JSON.parse(localStorage.getItem('token'))

  const header = {
    Authorization: `Bearer ${token}`,
  }

  const response = await axios({
    method: 'put',
    url: `${url}/add-giveaway/${id}`,
    headers: header,
  })

  return response.data
}

// add Giveaway
const requestGiveaway = async (id) => {
  const token = JSON.parse(localStorage.getItem('token'))

  const header = {
    Authorization: `Bearer ${token}`,
  }

  const response = await axios({
    method: 'post',
    url: `${url}/products/${id}/giveawayRequest`,
    headers: header,
  })

  return response.data
}

// winner select giveaway
const selectWinner = async (id) => {
  const token = JSON.parse(localStorage.getItem('token'))

  const header = {
    Authorization: `Bearer ${token}`,
  }

  const response = await axios({
    method: 'post',
    url: `${url}/giveaway/${id}/select-winner`,
    headers: header,
  })

  console.log("winner",response.data)

  return response.data
}

const adsService = {
  postAd,
  getAds,
  getItemUser,
  myads,
  deleteAd,
  updateAd,
  swapRequest,
  swapList,
  addGiveaway,
  requestGiveaway,
  selectWinner,
  approveSwap,
}

export default adsService
