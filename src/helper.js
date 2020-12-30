import drive from 'drive-db'

export const fetchData = async ({ sheet, tabs }) => {
  const data = await Promise.all(
    (Object.keys(tabs) || []).map(async (tab) => {
      return {
        [tab]: await drive({ sheet, tab: tabs[tab].toString(), cache: 0 }),
      }
    }),
  )
  let mergedData = {}
  data.forEach((obj) => {
    mergedData = { ...mergedData, ...obj }
  })
  return mergedData
}

export function shuffleArray(array) {
  const tempArray = array
  for (let i = tempArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]];
  }
  return tempArray
}

export function chunkify(a, n, balanced) {
  const ni = n
  if (n < 2)
    return [a];
  var len = a.length,
    out = [],
    i = 0,
    size;
  if (len % n === 0) {
    size = Math.floor(len / n);
    while (i < len) {
      out.push(a.slice(i, i += size));
    }
  }
  else if (balanced) {
    while (i < len) {
      size = Math.ceil((len - i) / n--);
      out.push(a.slice(i, i += size));
    }
  }
  else {
    n--;
    size = Math.floor(len / n);
    if (len % size === 0)
      size--;
    while (i < size * n) {
      out.push(a.slice(i, i += size));
    }
    out.push(a.slice(size * n));
  }
  if (out.length < ni) {
    for (let i = 0; i < (ni - out.length + 1); i++) {
      out.push([])
    }
  }
  return out;
}
