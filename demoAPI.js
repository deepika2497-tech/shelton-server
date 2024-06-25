(async () => {
  const apiURL =
    "https://www.sofascore.com/api/v1/unique-tournament/11165/season/58618/standings/total";

  const promises = [];
  for (let i = 0; i < 100; i++) {
    try {
      promises.push(fetch(apiURL));
    } catch (error) {
      console.error(`Loop ${i + 1}, Error: ${error.message}`);
    }
  }

  const data = await Promise.all(promises);

  console.log(
    data.map((response, index) => {
      return {
        id: index,
        status: response.status,
      };
    })
  );
})();
