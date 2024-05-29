//role 1 for hos,2 for bdm,3 for kam,4 for fte
const data = [
  {id:1,name:"sanjay",role:1,parent:null,child:[2,3],fteType:null},//hos
  {id:2,name:"sanjay1",role:2,parent:[1,14],child:[4,5],fteType:null},//bdm
  {id:3,name:"sanjay2",role:2,parent:[1,14],child:[6,7],fteType:null},//bdm
  {id:4,name:"sanjay3",role:3,parent:[2],child:[8,9],fteType:null},//kam
  {id:5,name:"sanjay4",role:3,parent:[2],child:[10,11,12,13],fteType:null},//kam
  {id:6,name:"sanjay5",role:3,parent:[3],child:[12,13],fteType:null},//kam
  {id:7,name:"sanjay6",role:3,parent:[3],child:[13],fteType:null},//kam
  {id:8,name:"sanjay7",role:4,parent:[4],child:[],fteType:1},
  {id:9,name:"sanjay8",role:4,parent:[4],child:[],fteType:2},
  {id:10,name:"sanjay9",role:4,parent:[5],child:[],fteType:2},
  {id:11,name:"sanjay10",role:4,parent:[5],child:[],fteType:3},
  {id:12,name:"sanjay11",role:4,parent:[5,6],child:[],fteType:4},
  {id:13,name:"sanjay12",role:4 ,parent:[5,6,7],child:[],fteType:1},
  {id:14,name:"sanjay13",role:1 ,parent:[],child:[2,3],fteType:2},
]

function createRandomID() {
 return Math.floor(100000 + Math.random() * 900000)
}
let hosColor = {
  nodeBGColor: '#286FB7',
  nodeBGColorHover: '#3375b8',
}
let bdmColor = {
  nodeBGColor: '#62BB46',
  nodeBGColorHover: '#6bbd51',
}
let kamColor = {
  nodeBGColor: '#A020F0',
  nodeBGColorHover: '#9a2fde',
}
let activeNodeStyle = {
  border: '2px solid red',
}
function fteColor(id){
  switch (id) {
    case 1:
      return {
        nodeBGColor: '#FF474C',
        nodeBGColorHover: '#f5565a',
      };
    case 2:
      return {
        nodeBGColor: '#ffbf00',
        nodeBGColorHover: '#edb91f',
      };
    case 3:
      return {
        nodeBGColor: '#f33a6a',
        nodeBGColorHover: '#f04873',
      };
    case 4:
      return {
        nodeBGColor: '#808080',
        nodeBGColorHover: '#807979',
      };
    default:
      return {
        nodeBGColor: '#F0B90B',
        nodeBGColorHover: '#F0B90B',
      };
  }
}


function getFTEName(id) {
  switch (id) {
    case 1:
      return "AMCS FTE";
    case 2:
      return "AMCC FTE";
    case 3:
      return "XE FTE";
    case 4:
      return "DE FTE";
    default:
      return "FTE";
  }
}
function  addActiveNodeStyle(node) {
  node.style.color = 'black';
}
const processHOSData = (data) => {
  let hos = data;

  hos.id = String(hos.id+'-'+createRandomID());
  hos.data={
    name:data.name,
    role:"HO Sales",
    active:true
  }
  hos.options=hosColor
  hos.children = data.bdms.map((bdm) =>{
    bdm.id = String(bdm.id+'-'+createRandomID());
    bdm.data = {
      name: bdm.name,
      role: "BDM",
    };
    bdm.options = bdmColor
    bdm.children = bdm.kams.map((kam) => {
      kam.id = String(kam.id+'-'+createRandomID());
      kam.data = {
        name: kam.name,
        role: "KAM",

      };
      kam.options = kamColor
      kam.children = kam?.ftes?.map((fte) => {
        fte.id = String(fte.id+'-'+createRandomID());
        fte.data = {
          name: fte.name,
          role: getFTEName(fte.fteType),
        };
        fte.options = fteColor(fte.fteType)
        return fte;
      });
      return kam;
    });
    return bdm
  });

  const options = {
    contentKey: 'data',
    width: 800,
    height: 600,
    nodeWidth: 150,
    nodeHeight: 100,
    fontColor: '#fff',
    borderColor: '#333',
    childrenSpacing: 50,
    highlightOnHover: true,
    siblingSpacing: 20,
    direction: 'top',
    enableExpandCollapse: false,
    enableToolbar: false,
    // enableExpandCollapse: true,
    nodeTemplate: (content) =>
      `<div style='display: flex;flex-direction: column;gap: 10px;justify-content: center;align-items: center;height: 100%;' id=${content?.active ? 'active-node' : ''}>
      <div style="font-weight: bold; font-family: Arial; font-size: 18px">${content.name}</div>
      <div style="font-weight: medium; font-family: Arial; font-size: 14px">( ${content.role} )</div>
     </div>`,
    canvasStyle: 'border: 1px solid black;background: #f6f6f6;',
   
  };
  const tree = new ApexTree(document.getElementById('svg-tree'), options);
  tree.render(hos);
 //on load the tree full content needs to be visible
 let activeNode = document.getElementById('active-node')
 addActiveNodeStyle(activeNode)
  
};

const processBDMData = (data) => {
  let bdm = {
    id: String(data.id+'-'+createRandomID()),
    data:{
      name:data.name,
      role:"BDM",
      active:true
    },
    options :bdmColor,
    children: data.hos.map((hos) => {
      hos.id = String(hos.id+'-'+createRandomID());
      hos.data = {
        name: hos.name,
        role: "HO Sales",
      };
      hos.options = hosColor;
      return hos;
    }),
  };
  let bdm2 = {
    id: String(data.id+'-'+createRandomID()),
    data:{
      name:data.name,
      role:"BDM",
    },
    options : bdmColor,
    children: data.kams.map((kam) => {
      kam.id = String(kam.id+'-'+createRandomID());
      kam.data = {
        name: kam.name,
        role: "KAM",
      };
      kam.options = kamColor;

      kam.children = kam?.ftes?.map((fte) => {
        fte.id = String(fte.id+'-'+createRandomID());
        fte.data = {
          name: fte.name,
          role: getFTEName(fte.fteType),
        };
        fte.options = fteColor(fte.fteType);
        return fte;
      });

      return kam;
    }),
  };
  const options = {
    contentKey: 'data',
    width: 800,
    height: 600,
    nodeWidth: 150,
    nodeHeight: 100,
    fontColor: '#fff',
    borderColor: '#333',
    childrenSpacing: 50,
    highlightOnHover: true,
    siblingSpacing: 20,
    direction: 'top',
    enableExpandCollapse: false,
    enableToolbar: false,
    // enableExpandCollapse: true,
    nodeTemplate: (content) =>
      `<div style='display: flex;flex-direction: column;gap: 10px;justify-content: center;align-items: center;height: 100%;' id=${content?.active ? 'active-node' : ''}>
      <div style="font-weight: bold; font-family: Arial; font-size: 18px">${content.name}</div>
      <div style="font-weight: medium; font-family: Arial; font-size: 14px">( ${content.role} )</div>
     </div>`,
    canvasStyle: 'border: 1px solid black;background: #f6f6f6;',

  };
  const tree = new ApexTree(document.getElementById('svg-tree'), options);
  const graph = tree.render(bdm2);
  //create a dummy graph which is hidden
  const createTree = document.createElement("div");
  createTree.innerHTML = `
  <div id="svg-tree2" style="display:none"></div>
  `;
  document.body.appendChild(createTree);
  let options2 = {...options}
  options2.containerClassName = 'root2'
  options2.direction = 'bottom'
  const tree2 = new ApexTree(document.getElementById('svg-tree2'), options2);
  const graph2 = tree2.render(bdm);
 
    
    const root2 = document.getElementById("root2");
   const containerSVG = document.querySelector("#apexTreeWrapper svg");
   containerSVG.appendChild(root2);
   root2.style.transform = "translate(-85px, 0px)";
   let activeNode = document.getElementById('active-node')
   addActiveNodeStyle(activeNode)
};

const processKAMData = (data) => {
 const kam = {
   id: String(data.id+'-'+createRandomID()),
   data: {
     name: data.name,
     role: "KAM",
     
   },
   options: kamColor,
   children:data.bdms.map((bdm) => {
     bdm.id = String(bdm.id+'-'+createRandomID());
     bdm.data = {
       name: bdm.name,
       role: "BDM",
     };
     bdm.options = bdmColor,
     bdm.children = bdm.hos.map((hos) => {
       hos.id = String(hos.id+'-'+createRandomID());
       hos.data = {
         name: hos.name,
         role: "HO Sales",
       };
       hos.options = hosColor;
       return hos;
     })
     return bdm;
   }),

 }
 const kam2 = {
  id: String(data.id+'-'+createRandomID()),
  data: {
    name: data.name,
    role: "KAM",
    active:true
  },
  options: kamColor,
  children:data.ftes.map((fte) => {
    fte.id = String(fte.id+'-'+createRandomID());
    fte.data = {
      name: fte.name,
      role: getFTEName(fte.fteType),
    };
    fte.options = fteColor(fte.fteType);
    return fte;

  })

}

  const options = {
    contentKey: 'data',
    width: 800,
    height: 600,
    nodeWidth: 150,
    nodeHeight: 100,
    fontColor: '#fff',
    borderColor: '#333',
    childrenSpacing: 50,
    highlightOnHover: true,
    siblingSpacing: 20,
    direction: 'bottom',
    enableExpandCollapse: false,
    enableToolbar: false,
    // enableExpandCollapse: true,
    nodeTemplate: (content) =>
      `<div style='display: flex;flex-direction: column;gap: 10px;justify-content: center;align-items: center;height: 100%;' id=${content?.active ? 'active-node' : ''}>
      <div style="font-weight: bold; font-family: Arial; font-size: 18px">${content.name}</div>
      <div style="font-weight: medium; font-family: Arial; font-size: 14px">( ${content.role} )</div>
     </div>`,
    canvasStyle: 'border: 1px solid black;background: #f6f6f6;',

  };
  const tree = new ApexTree(document.getElementById('svg-tree'), options);
  const graph = tree.render(kam);

  //create a dummy graph which is hidden
  const createTree = document.createElement("div");
  createTree.innerHTML = `
  <div id="svg-tree2" style="display:none"></div>
  `;
  document.body.appendChild(createTree);
  let options2 = {...options}
  options2.containerClassName = 'root2'
  options2.direction = 'top'
  const tree2 = new ApexTree(document.getElementById('svg-tree2'), options2);
  const graph2 = tree2.render(kam2);
 
    
    const root2 = document.getElementById("root2");
   const containerSVG = document.querySelector("#apexTreeWrapper svg");
   containerSVG.appendChild(root2);
   root2.style.transform = "translate(85px, 0px)";
   let activeNode = document.getElementById('active-node')
   addActiveNodeStyle(activeNode)
};
const processFTEData = (data) => {
    let fte = {
      id: String(data.id+'-'+createRandomID()),
      data: {
        name: data.name,
        role: getFTEName(data.fteType),
        active:true,
      },
      
      options: fteColor(data.fteType),
      children: data.kams.map((kam) => {
        kam.id = String(kam.id+'-'+createRandomID());
        kam.data = {
          name: kam.name,
          role: "KAM",
        };
        kam.options = kamColor
        kam.children= kam.bdms.map((bdm) => {
          bdm.id = String(bdm.id+'-'+createRandomID());
          bdm.data = {
            name: bdm.name,
            role: "BDM",
          };
          bdm.options = bdmColor
          bdm.children= bdm.hos.map((hos) => {
            hos.id = String(hos.id+'-'+createRandomID());
            hos.data = {
              name: hos.name,
              role: "HO Sales",
            };
            hos.options = hosColor
            return hos;
          })
          return bdm;
        })
        return kam;
      })
    }

  const options = {
    contentKey: 'data',
    width: 800,
    height: 600,
    nodeWidth: 150,
    nodeHeight: 100,
    fontColor: '#fff',
    borderColor: '#333',
    childrenSpacing: 50,
    highlightOnHover: true,
    siblingSpacing: 20,
    direction: 'bottom',
    enableExpandCollapse: false,
    enableToolbar: false,
    // enableExpandCollapse: true,
    nodeTemplate: (content) =>
      `<div style='display: flex;flex-direction: column;gap: 10px;justify-content: center;align-items: center;height: 100%;' id=${content?.active ? 'active-node' : ''}>
      <div style="font-weight: bold; font-family: Arial; font-size: 18px">${content.name}</div>
      <div style="font-weight: medium; font-family: Arial; font-size: 14px">( ${content.role} )</div>
     </div>`,
    canvasStyle: 'border: 1px solid black;background: #f6f6f6;',

  };
  const tree = new ApexTree(document.getElementById('svg-tree'), options);
  const graph = tree.render(fte);
  let activeNode = document.getElementById('active-node')
  addActiveNodeStyle(activeNode)
}


const findHOSDetails = (data, hosId) => {
  const hos = data.find(item => item.id === hosId);
  if (!hos) return null;
  const bdms = hos.child.map(bdmId => {
    const bdm = data.find(item => item.id === bdmId);
    if (!bdm) return null;
    return {
      id: bdm.id,
      name: bdm.name,
      kams: bdm.child.map(kamId => {
        const kam = data.find(item => item.id === kamId);
        if (!kam) return null;
        return {
          id: kam.id,
          name: kam.name,
          ftes: kam.child.map(fteId => {
            const fte = data.find(item => item.id === fteId);
            if (!fte) return null;
            return {
              id: fte.id,
              name: fte.name,
              fteType: fte.fteType
            };
          })
        };
      })
    };
  })
  return {
    id: hos.id,
    name: hos.name,
    bdms
  };
}


function findBDMDetails(data, bdmId) {
  const bdm = data.find(item => item.id === bdmId && item.role === 2);
  if (!bdm) return null;

  const kams = bdm.child.map(kamId => {
    const kam = data.find(item => item.id === kamId && item.role === 3);
    if (!kam) return null;
    const ftes = kam.child.map(fteId => {
      const fte = data.find(item => item.id === fteId && item.role === 4);
      if (!fte) return null;
      return {
        id: fte.id,
        name: fte.name,
        fteType: fte.fteType
      };
    }).filter(fte => fte);
    return {
      id: kam.id,
      name: kam.name,
      ftes
    };
  }).filter(kam => kam);
  const hos = bdm.parent.map(hosId => {
    const hos = data.find(item => item.id === hosId && item.role === 1);
    if (!hos) return null;
    return {
      id: hos.id,
      name: hos.name
    };
  })
  return {
    id: bdm.id,
    name: bdm.name,
    kams,
    hos
  };
}

function findKAMDetails(data, kamId) {
  const kam = data.find(item => item.id === kamId && item.role === 3);
  if (!kam) return null;

  const ftes = kam.child.map(fteId => {
    const fte = data.find(item => item.id === fteId && item.role === 4);
    if (!fte) return null;
    return {
      id: fte.id,
      name: fte.name,
      fteType: fte.fteType
    };
  }).filter(fte => fte);
  const bdms = kam.parent.map(bdmId => {
    const bdm = data.find(item => item.id === bdmId && item.role === 2);
    if (!bdm) return null;
    return {
      id: bdm.id,
      name: bdm.name,
      hos: bdm.parent.map(hosId => {
        const hos = data.find(item => item.id === hosId && item.role === 1);
        if (!hos) return null;
        return {
          id: hos.id,
          name: hos.name
        };
      })
    };
  }).filter(bdm => bdm);
  return {
    id: kam.id,
    name: kam.name,
    ftes,
    bdms
  };
  
}



function findFTEDetails(data, fteId) {
  const fte = data.find(item => item.id === fteId && item.role === 4);
  if (!fte) return null;

  const kamDetails = [];
  fte.parent.forEach(kamId => {
    const kam = data.find(item => item.id === kamId && item.role === 3);
    if (kam) {
 
      kamDetails.push({
        id: kam.id,
        name: kam.name,
        bdms: kam.parent.map(bdmId => {
          const bdm = data.find(item => item.id === bdmId && item.role === 2);
          return {
            id: bdm.id,
            name: bdm.name,
            hos: bdm.parent.map(hosId => {
              const hos = data.find(item => item.id === hosId && item.role === 1);
              return {
                id: hos.id,
                name: hos.name
              };
            })
          };
        })
      });
    }
  });

  return {
    id: fte.id,
    name: fte.name,
    fteType: fte.fteType,
    kams: kamDetails
  };
}
function generateData(data, id) {
  const user = data.find(item => item.id === id);
  if(!user) return null;
  if(user.role === 1){
    const newData = findHOSDetails(data, id);
    if(!newData) return null;
    processHOSData(newData);
  }else if(user.role === 2){
    const newData = findBDMDetails(data, id);
    if(!newData) return null;
    processBDMData(newData);
  }else if(user.role === 3){
    const newData = findKAMDetails(data, id);
    if(!newData) return null;
    processKAMData(newData);
  }else if(user.role === 4){
    const newData = findFTEDetails(data, id);
    if(!newData) return null;
    processFTEData(newData);
  }
}

generateData(data, 13);