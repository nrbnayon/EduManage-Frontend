import axios from "axios";
import { useEffect, useState } from "react";

const useMenu = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/menu")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setMenus(res.data);
        } else {
          console.error("Expected an array of menus, but got:", res.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
        setLoading(false);
      });
  }, []);

  return [menus, loading];
};

export default useMenu;

// import axios from "axios";
// import { useEffect, useState } from "react";

// const useMenu = () => {
//   const [menus, setMenus] = useState([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     axios.get("./menu.json").then((res) => {
//       const items = res.data;
//       setMenus(items);
//       setLoading(false);
//     });
//   }, []);
//   return [menus, loading];
// };

// export default useMenu;
