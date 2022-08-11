function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const str =
  '{"coordinates":[[-43.0086334,-22.837745],[-43.24671,-22.8860623],[-43.0086334,-22.837745],[-43.24671,-22.8860623],[-43.4333116,-22.7694478],[-43.2028723,-22.9096782],[-43.0086334,-22.837745],[-43.24671,-22.8860623],[-43.2028723,-22.9096782],[-43.0086334,-22.837745],[-43.10078499999999,-22.8956673],[-43.24671,-22.8860623],[-43.2181706,-22.811957],[-43.24671,-22.8860623],[-43.0086334,-22.837745]],"type":"LineString","bbox":[-43.4333116,-22.9096782,-43.0086334,-22.7694478]}';

// console.log(JSON.stringify(str));

const str2 =
  '{"coordinates":[[-43.0086334,-22.837745],[-43.24671,-22.8860623],[-43.0086334,-22.837745],[-43.24671,-22.8860623],[-43.4333116,-22.7694478],[-43.2028723,-22.9096782],[-43.0086334,-22.837745],[-43.24671,-22.8860623],[-43.2028723,-22.9096782],[-43.0086334,-22.837745],[-43.10078499999999,-22.8956673],[-43.24671,-22.8860623],[-43.2181706,-22.811957],[-43.24671,-22.8860623],[-43.0086334,-22.837745]],"type":"LineString","bbox":[-43.4333116,-22.9096782,-43.0086334,-22.7694478]}';

const str3 =
  '"{"coordinates":[[-43.2028723,-22.9096782],[-43.0086334,-22.837745],[-43.2028723,-22.9096782],[-43.24671,-22.8860623],[-43.2028723,-22.9096782],[-43.24671,-22.8860623],[-43.24671,-22.8860623],[-43.24671,-22.8860623],[-43.24671,-22.8860623],[-43.24671,-22.8860623],[-43.24671,-22.8860623],[-43.24671,-22.8860623],[-43.2028723,-22.9096782]],"type":"LineString","bbox":[-43.24671,-22.9096782,-43.0086334,-22.837745]}"';

//   claudio é possível integrar a geometria de posição em posição, ao invez de mandar tudo de uma vez?
// pensando no caso das linhas de porta em porta, que fazem um trajeto diferente todos os dias.
// analisamos aqui e vi que dá pra usar a última posição de dois em dois minutos.
// se corrigirmos esse problema da geometria, então estará tudo corrigido?

// const arr = [123.123123, 1231.3123];
const arr = [];
const strArr = JSON.stringify(arr);

// console.log(JSON.parse(strArr));

const func = async () => {
  const arr = [1, 2, 3];
  for (const e of arr) {
    try {
      await new Promise((res, rej) => {
        if (e === 2) throw new Error("error");
        res();
      });
      console.log(e);
    } catch (error) {
      console.log(error.message);
    }
  }
};

func();
