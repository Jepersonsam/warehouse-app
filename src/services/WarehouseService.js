import api from './api'

export const fetchWarehouses = () => {
  return api.get('/public-warehouses') // sesuaikan dengan endpoint kamu
}

export const fetchWarehouseById = (id) => {
  return api.get(`/warehouses/${id}`)
}
