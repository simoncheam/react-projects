const paginate = (followers) => {
//   console.log(followers);

  const itemsPerPage = 10;
  const pages = Math.ceil(followers.length / itemsPerPage); // # pages we need

  // creating new array with items per page, setting up array of arrays for pagination
  const newFollowers = Array.from({ length: pages }, (_, index) => {
    const start = index * itemsPerPage;
    return followers.slice(start, start + itemsPerPage);
  });

 return newFollowers;
};

export default paginate;
