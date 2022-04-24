import axiosConfig from 'utils/axios.config';

export const getCategories = async () => {
  const getData = await axiosConfig.get('/fee-assessment-categories')
  .then((v) => {
    return v.data;
  }).catch((err: any) => {
    console.log('Getting Error', err);
  });
  return getData;
};