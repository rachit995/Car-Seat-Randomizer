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

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function generate(max, thecount) {
  var r = [];
  var currsum = 0;
  for (var i = 0; i < thecount - 1; i++) {
    r[i] = randomBetween(0, max - (thecount - i - 1) - currsum);
    currsum += r[i];
  }
  r[thecount - 1] = max - currsum;
  return r;
}

export function chunkify(a, n, uniform = false) {
  const arrayLength = n
  if (n < 2)
    return [a];
  var len = a.length,
    out = [],
    i = 0,
    balanced = true,
    size;
  if (uniform) {
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

  } else {
    const splits = generate(a.length, n)
    splits.unshift(0)
    for (let i = 1; i < splits.length; i++) {
      out.push(a.slice(splits[i - 1], splits[i - 1] + splits[i]));
    }
  }
  if (out.length < arrayLength) {
    for (let i = 0; i < (arrayLength - out.length + 1); i++) {
      out.push([])
    }
  }
  return out;
}
