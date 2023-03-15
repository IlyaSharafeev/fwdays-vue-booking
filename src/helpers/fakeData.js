import faker from "faker";

export const fakeList = (dates, count = 100) => {
  const res = [];
  for (let i = 0; i < count; i += 1) {
    res.push({
      id: i,
      title: `JET ${faker.random.word()}`,
      dates: dates,
      image: faker.image.image(),
    });
  }
  return res;
};
