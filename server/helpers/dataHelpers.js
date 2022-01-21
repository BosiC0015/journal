const getDiariesByUser = (userDiaries) => {

  const diariesByUser = userDiaries.map(diary => { diary.title, diary.content, diary.date });

  return diariesByUser;
};

module.exports = {
  getDiariesByUser
};