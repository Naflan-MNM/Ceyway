import React, { createContext, useState } from "react";

export const CeywayContext = createContext();

const CeywayContextProvider = (props) => {
  const LOCAL_IP = "192.168.43.77"; //or 10.0.2.2 this is only work if you use android simulator not for your mobile device  // <<<<< REPLACE THIS IP

  const LocationData = [
    {
      id: "1",
      title: "Nallur Kovil",
      location: "Jaffna",
      distance: "4 km",
      description: "A historic Hindu temple located in the Jaffna Peninsula.",
      image: require("../assets/images/Nallur_Kandasam.jpg"),
    },
    {
      id: "2",
      title: "Point Pedro",
      location: "Jaffna",
      distance: "14 km",
      description:
        "The northernmost point of Sri Lanka, known for its beaches.",
      image: require("../assets/images/Point_pedro.jpg"),
    },
    {
      id: "3",
      title: "Nagadeepa Vihara",
      location: "Jaffna",
      distance: "32 km",
      description: "An important Buddhist temple located on a small island.",
      image: require("../assets/images/Nagadeepa Vihara.jpg"),
    },
    {
      id: "4",
      title: "Casuarina Beach",
      location: "Jaffna",
      distance: "28 km",
      description: "A popular beach with calm waters and a serene atmosphere.",
      image: require("../assets/images/Casuarina_Beach.jpg"),
    },
    {
      id: "5",
      title: "Jaffna Fort",
      location: "Jaffna",
      distance: "2 km",
      description: "Built by the Portuguese, later expanded by the Dutch.",
      image: require("../assets/images/Jaffna_Fort.jpg"),
    },
    {
      id: "6",
      title: "Jaffna Library",
      location: "Jaffna",
      distance: "1.5 km",
      description: "Famous for its historical and cultural significance.",
      image: require("../assets/images/Library_Jaffna.jpg"),
    },
    {
      id: "7",
      title: "Delft Island",
      location: "Jaffna",
      distance: "35 km",
      description: "Known for its wild horses and unique coral landscapes.",
      image: require("../assets/images/Delft Island.jpg"),
    },
    {
      id: "8",
      title: "Muruthan Lake",
      location: "On the way",
      distance: "10 km",
      description: "A beautiful lake located on the way to Jaffna.",
      image: require("../assets/images/Delft Island.jpg"),
    },
    {
      id: "9",
      title: "Nanthi Kadal",
      location: "On the way",
      distance: "15 km",
      description: "A lagoon with significant historical relevance.",
      image: require("../assets/images/Nanthi Kadal.jpg"),
    },
    {
      id: "10",
      title: "Redcliff",
      location: "On the way",
      distance: "22 km",
      description: "A scenic location known for its cliffs and views.",
      image: require("../assets/images/Redcliff.jpg"),
    },
  ];

  /*used by ...  */
  const [selectedItems, setSelectedItems] = useState([]); //for checkbox

  /* this states are used by MembersDateVehicleScreen, */
  const [adults, setAdults] = useState(2); //handle the number of adult
  const [children, setChildren] = useState(1); //handle the number of children
  const [members, setMembers] = useState(
    `${adults} Adults, ${children} Children`
  ); //this is for displaying purpose
  let totalmembers = adults + children;
  const [vehicle, setVehicle] = useState("Car"); //handle the type of vehical
  const [fromDate, setFromDate] = useState(null); //handke the from date
  const [toDate, setToDate] = useState(null); //handle the to date
  /*  */
  const [destinationData, setdestinationData] = useState([]);
  const [onTheWayData, setOnTheWayData] = useState([]);
  /* used in inthe summary screen, destinatons screen */
  const [activeTab, setActiveTab] = useState("Destinations");

  /* // Filter the LocationData into two arrays: Jaffna and On the way
    const destinationData = LocationData.filter(item => item.location === 'Jaffna');
    const onTheWayData = LocationData.filter(item => item.location === 'On the way'); */

  const toggleSelection = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter((id) => id !== itemId); // Deselect
      } else {
        return [...prevSelectedItems, itemId]; // Select
      }
    });
  };

  const value = {
    LocationData,
    destinationData,
    onTheWayData,
    selectedItems,
    adults,
    toDate,
    fromDate,
    vehicle,
    children,
    members,
    LOCAL_IP,
    activeTab,
    totalmembers,
    toggleSelection,
    setToDate,
    setFromDate,
    setVehicle,
    setChildren,
    setAdults,
    setMembers,
    setdestinationData,
    setOnTheWayData,
    setActiveTab,
  };
  console.log("totalmembers", totalmembers);
  return (
    <CeywayContext.Provider value={value}>
      {props.children}
    </CeywayContext.Provider>
  );
};

export { CeywayContextProvider };
