const getGps = jest.fn(succeeds => {
  return new Promise((resolve, reject) => {
    if (succeeds) {
      resolve('Success!');
    } else {
      reject({ error: 'Error', trigger: 'gps' });
    }
  });
});
const makeHttps = jest.fn(succeeds => {
  return new Promise((resolve, reject) => {
    if (succeeds) {
      resolve('Success!');
    } else {
      reject({ error: 'Error', trigger: 'https' });
    }
  });
});

const clockIn = (gps, https) =>
  gps()
    .then(() => {
      return https()
        .catch(error => {
          throw error;
        })
        .then(() => 'OK');
    })
    .catch(error => {
      if (error.trigger === 'gps') {
        return https()
          .catch(() => {
            throw 'Error + GPS Warn';
          })
          .then(() => 'OK + GPS Warn');
      } else {
        throw error.error;
      }
    });

describe('The clock-in Module', () => {
  it('requests the GPS values', () => {
    expect.assertions(1);
    const expected = 'Success!';
    return expect(getGps(true)).resolves.toBe(expected);
  });

  test('sends the http request', () => {
    expect.assertions(1);
    const expected = 'Success!';
    return expect(makeHttps(true)).resolves.toBe(expected);
  });

  test('WHEN the gps succeeds AND https request succeeds', () => {
    expect.assertions(1);
    const expected = 'OK';
    return expect(clockIn(() => getGps(true), () => makeHttps(true))).resolves.toBe(expected);
  });
  test('WHEN the gps succeeds AND https request fails', () => {
    expect.assertions(1);
    const expected = 'Error';
    return expect(clockIn(() => getGps(true), () => makeHttps(false))).rejects.toBe(expected);
  });
  test('WHEN the gps fails AND https request succeeds', () => {
    expect.assertions(1);
    const expected = 'OK + GPS Warn';
    return expect(clockIn(() => getGps(false), () => makeHttps(true))).resolves.toBe(expected);
  });
  test('WHEN the gps fails AND https request fails', () => {
    expect.assertions(1);
    const expected = 'Error + GPS Warn';
    return expect(clockIn(() => getGps(false), () => makeHttps(false))).rejects.toBe(expected);
  });
});
