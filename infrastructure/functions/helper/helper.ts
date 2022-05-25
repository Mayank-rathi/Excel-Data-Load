import fetch from 'node-fetch';
import dotenv from 'dotenv'
dotenv.config()


const graphUrl = process.env['GRAPHQL']
const route = process.env['ROUTE']
const defaultOwner = process.env['OWNER']
console.log("graphUrl==> ", graphUrl);
console.log("route =====> ", route);
console.log("defaultOwner =====> ", defaultOwner);

//Pass the value to ConfigurationJson Interface
export function newFunctionToJson(rowHeaderName: any[], element: string, configIndex: any) {
  return {
    "id": element,
    "owner": defaultOwner,
    "configCategories": [
      {
        "name": "Portal",
        "subcategories": [
          {
            "name": `${configIndex[0]}`,
            "subcategories": [
              {
                "name": `${configIndex[1]}`,
                "configs": [
                  {
                    "name": `${configIndex[2]}`,
                    "value": `${rowHeaderName[3]}`
                  },
                  {
                    "name": `${configIndex[3]}`,
                    "value": `${rowHeaderName[4]}`
                  },
                  {
                    "name": `${configIndex[4]}`,
                    "value": `${rowHeaderName[5]}`
                  },
                  {
                    "name": `${configIndex[5]}`,
                    "value": `${rowHeaderName[6]}`
                  },
                  {
                    "name": `${configIndex[6]}`,
                    "value": `${rowHeaderName[7]}`
                  },
                  {
                    "name": `${configIndex[7]}`,
                    "value": `${rowHeaderName[8]}`
                  },
                  {
                    "name": `${configIndex[8]}`,
                    "value": `${rowHeaderName[9]}`
                  },
                ]
              },
              {
                "name": `${configIndex[9]}`,
                "configs": [
                  {
                    "name": `${configIndex[10]}`,
                    "value": `${rowHeaderName[12]}`
                  },
                  {
                    "name": `${configIndex[11]}`,
                    "value": `${rowHeaderName[13]}`
                  },
                  {
                    "name": `${configIndex[12]}`,
                    "value": `${rowHeaderName[14]}`
                  },
                  {
                    "name": `${configIndex[15]}`,
                    "value": `${rowHeaderName[17]}`
                  },
                  {
                    "name": `${configIndex[16]}`,
                    "value": `${rowHeaderName[18]}`
                  },
                  {
                    "name": `${configIndex[17]}`,
                    "value": `${rowHeaderName[19]}`
                  },
                  {
                    "name": `${configIndex[18]}`,
                    "value": `${rowHeaderName[20]}`
                  },
                  {
                    "name": `${configIndex[19]}`,
                    "value": `${rowHeaderName[21]}`
                  },
                  {
                    "name": `${configIndex[20]}`,
                    "value": `${rowHeaderName[22]}`
                  },
                  {
                    "name": `${configIndex[21]}`,
                    "value": `${rowHeaderName[23]}`
                  },
                  {
                    "name": `${configIndex[22]}`,
                    "value": `${rowHeaderName[24]}`
                  }
                ]
              },
              {
                "name": `${configIndex[23]}`,
                "configs": [
                  {
                    "name": `${configIndex[24]}`,
                    "value": `${rowHeaderName[27]}`
                  },
                  {
                    "name": `${configIndex[25]}`,
                    "value": `${rowHeaderName[28]}`
                  }
                ]
              }
            ]
          },
          {
            "name": `${configIndex[26]}`,
            "subcategories": [
              {
                "name": `${configIndex[27]}`,
                "configs": [
                  {
                    "name": `${configIndex[28]}`,
                    "value": `${rowHeaderName[33]}`
                  },
                  {
                    "name": `${configIndex[29]}`,
                    "value": `${rowHeaderName[34]}`
                  },
                  {
                    "name": `${configIndex[30]}`,
                    "value": `${rowHeaderName[35]}`
                  },
                  {
                    "name": `${configIndex[31]}`,
                    "value": `${rowHeaderName[36]}`
                  }
                ]
              },
              {
                "name": `${configIndex[32]}`,
                "configs": [
                  {
                    "name": `${configIndex[33]}`,
                    "value": `${rowHeaderName[39]}`
                  },
                  {
                    "name": `${configIndex[34]}`,
                    "value": `${rowHeaderName[40]}`
                  },
                  {
                    "name": `${configIndex[35]}`,
                    "value": `${rowHeaderName[41]}`
                  },
                  {
                    "name": `${configIndex[36]}`,
                    "value": `${rowHeaderName[42]}`
                  },
                  {
                    "name": `${configIndex[37]}`,
                    "value": `${rowHeaderName[43]}`
                  }
                ]
              }
            ]
          },
          {
            "name": `${configIndex[38]}`,
            "subcategories": [
              {
                "name": `${configIndex[39]}`,
                "configs": [
                  {
                    "name": `${configIndex[40]}`,
                    "value": `${rowHeaderName[48]}`
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}

export function MutationQueryFunction(result: any) {
  try {
    for (let index = 0; index < result.length; index++) {
      const jsondata = JSON.stringify(result[index]).replace(/\\"/g, '');
      const data1 = JSON.stringify({
        query: `mutation Mutation($businessEntity: BusinessEntityConfigsInput) {
          AddBussinessEntityWithConfig(businessEntity: $businessEntity)
        }`,
        variables: `{"businessEntity": ${jsondata}}`,
      });
      (async () => {
        const url = graphUrl + '' + route;
        const rawResponse = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: data1
        });
        const content = await rawResponse.json();
        console.log(content);
      })();
      //break
      // setTimeout(function() {
      // },5000);
    }
  } catch (error) {
    console.log('error Message', error as Error);
  }
}