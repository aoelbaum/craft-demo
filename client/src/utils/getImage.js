const getImage = (img) => (img ? require(`@/assets/${img}`) : '');

export default getImage;
