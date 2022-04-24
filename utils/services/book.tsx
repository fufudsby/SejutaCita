import axiosConfig from 'utils/axios.config';

export const getBooks = async (categoryId: number, page: number = 0, size: number = 10) => {
  const pageParams = !page || page < 0 ? 0 : page;
  const sizeParams = !size || size < 0 ? 0 : size;
  const getData = await axiosConfig
  .get(`/fee-assessment-books?categoryId=${categoryId}&page=${pageParams}&size=${sizeParams}`)
  .then((v) => {
    return v.data;
  }).catch((err: any) => {
    console.log('Getting Error', err);
  });
  return getData;
};