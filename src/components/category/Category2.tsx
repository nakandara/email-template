// import React, { useState } from "react";
// import {
//   List,
//   ListItem,
//   ListItemText,
//   Collapse,
//   Typography,
// } from "@mui/material";

// interface DataItem {
//   variable: string;
//   example?: any;
//   type: string;
//   itemType?: string;
//   itemKeys?: DataItem[];
// }

// interface Category {
//   title: string;
//   subcategories?: Category[];
// }

// const transformDataToCategory = (data: DataItem): Category => {
//   return {
//     title: data.variable,
//     subcategories: data.itemKeys?.map(transformDataToCategory),
//   };
// };

// const Category2: React.FC = () => {
//   const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

//   const toggleCategory = (title: string) => {
//     if (expandedCategories.includes(title)) {
//       setExpandedCategories(
//         expandedCategories.filter((category) => category !== title)
//       );
//       setSelectedCategory(null);
//     } else {
//       setExpandedCategories([...expandedCategories, title]);
//       setSelectedCategory(title);
//     }
//   };
//   const renderCategory = (category: Category) => (
//     <div key={category.title}>
//       <ListItem button onClick={() => toggleCategory(category.title)}>
//         <ListItemText primary={category.title} />
//         {category.subcategories && category.subcategories.length > 0 && (
//           <Typography variant="body2">
//             {expandedCategories.includes(category.title) ? "[-]" : "[+]"}
//           </Typography>
//         )}
//       </ListItem>
//       {category.subcategories && category.subcategories.length > 0 && (
//         <Collapse sx={{ marginLeft: "50px" }} in={expandedCategories.includes(category.title)}>
//           <List component="div" disablePadding>
//             {category.subcategories.map(renderCategory)}
//           </List>
//         </Collapse>
//       )}
//     </div>
//   );

//   const newData: DataItem[] = [
//     {
//       variable: "name",
//       example: "Ruwan",
//       type: "string",
//     },
//     {
//       variable: "address",
//       example: null,
//       type: "object",
//       itemKeys: [
//         {
//           variable: "addressLine1",
//           example: "Madurupitiya",
//           type: "string",
//         },
//         {
//           variable: "addressLine2",
//           example: "Loluwagoda",
//           type: "string",
//         },
//         {
//           variable: "city",
//           example: "Mirigama",
//           type: "string",
//         },
//         {
//           variable: "zipCode",
//           example: "11204",
//           type: "string",
//         },
//       ],
//     },
//     {
//       variable: "birthday",
//       example: "1888-07-17T00:00:00.000Z",
//       type: "date",
//     },
//     {
//       variable: "pastOrders",
//       example: null,
//       type: "array",
//       itemType: "object",
//       itemKeys: [
//         {
//           variable: "type",
//           example: "cat food",
//           type: "string",
//         },
//         {
//           variable: "price",
//           example: 100,
//           type: "number",
//         },
//       ],
//     },
//   ];

//   const transformedData: Category[] = newData.map(transformDataToCategory);

//   return (
//     <List>
//       <div className="card-container">
//         <div className="card">{transformedData.map(renderCategory)}</div>
//         <div className="card" style={{ background: "lightgray" }}>
//           <h2>{selectedCategory || "Content"}</h2>
//           {/* Add additional content based on the selected category */}
//         </div>
//       </div>
//     </List>
//   );
// };

// export default Category2;

import React, { useState } from "react";
import "./CardBoxes.css";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
} from "@mui/material";
import CustomCard from "./CustomCardProps";

interface DataItem {
  variable: string;
  example?: any;
  type: string;
  itemType?: string;
  itemKeys?: DataItem[];
}

interface Category {
  title: string;
  subcategories?: Category[];
}

const transformDataToCategory = (data: DataItem): Category => {
  return {
    title: data.variable,
    subcategories: data.itemKeys?.map(transformDataToCategory),
  };
};

const Category2: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleCategory = (title: string) => {
    if (expandedCategories.includes(title)) {
      setExpandedCategories(
        expandedCategories.filter((category) => category !== title)
      );
      setSelectedCategory(title);
    } else {
      setExpandedCategories([...expandedCategories, title]);
      setSelectedCategory(title);
    }
  };

  const renderCategory = (category: Category) => (
    <div key={category.title}>
      <ListItem
        button
        onClick={() => toggleCategory(category.title)}
        sx={{
          backgroundColor:
            selectedCategory === category.title ? "lightblue" : "inherit",
        }}
      >
        <ListItemText primary={category.title} />
        {category.subcategories && category.subcategories.length > 0 && (
          <Typography variant="body2">
            {expandedCategories.includes(category.title) ? "[-]" : "[+]"}
          </Typography>
        )}
      </ListItem>
      {category.subcategories && category.subcategories.length > 0 && (
        <Collapse
          sx={{ marginLeft: "50px" }}
          in={expandedCategories.includes(category.title)}
        >
          <List component="div" disablePadding>
            {category.subcategories.map(renderCategory)}
          </List>
        </Collapse>
      )}
    </div>
  );

  const newData: DataItem[] = [
    {
      variable: "Name",
      example: "Ruwan",
      type: "string",
    },
    {
      variable: "Address",
      example: null,
      type: "object",
      itemKeys: [
        {
          variable: "Address Line 1",
          example: "Madurupitiya",
          type: "string",
        },
        {
          variable: "Address Line 2",
          example: "Loluwagoda",
          type: "string",
        },
        {
          variable: "City",
          example: "Mirigama",
          type: "string",
        },
        {
          variable: "Zip Code",
          example: "11204",
          type: "string",
        },
      ],
    },
    {
      variable: "Birthday",
      example: "1888-07-17T00:00:00.000Z",
      type: "date",
    },
    {
      variable: "Past Orders",
      example: null,
      type: "array",
      itemType: "object",
      itemKeys: [
        {
          variable: "Type",
          example: "cat food",
          type: "string",
        },
        {
          variable: "Price",
          example: 100,
          type: "number",
        },
      ],
    },
  ];

  const transformedData: Category[] = newData.map(transformDataToCategory);

  const CardContainer: React.FC<{ selectedCategory: any }> = ({
    selectedCategory,
  }) => (
    <div className="card-container">
      <div className="card">
        {(() => {
          switch (selectedCategory) {
            case "Name":
              return <NameCard />;
            case "Address Line 1":
              return <AddressCardOne />;
            case "Address Line 2":
              return <AddressCardTwo />;
            case "City":
              return <CityCard />;
            case "Zip Code":
              return <ZipCodeCard />;
            case "Birthday":
              return <BirthDayCard />;
            case "Type":
              return <PastOrdersTypeCard />;
            case "Price":
              return <PastOrdersPriceCard />;

            default:
              return "Select Options";
          }
        })()}
      </div>
    </div>
  );

  const NameCard: React.FC = () => (
    <CustomCard title="Sadun Perera" >
     
    </CustomCard>
  );
  
  const AddressCardOne: React.FC = () => (
    <CustomCard title="CA California" >
     
    </CustomCard>
  );
  const AddressCardTwo: React.FC = () => (
    <CustomCard title="87/44 A warden Place">
      
    </CustomCard>
  );
  const CityCard: React.FC = () => (
    <CustomCard title="Jerusalem" >
      
    </CustomCard>
  );

  
  const ZipCodeCard: React.FC = () => (
    <CustomCard title="65000" >
      
    </CustomCard>
  );

  const BirthDayCard: React.FC = () => (
    <CustomCard title="65000"  >
      sfsfsfsf
    </CustomCard>
  );

 

  const PastOrdersTypeCard: React.FC = () => (
    <div className="">
      <div className="input-group">
        <label>Type:</label>
        <select>
          <option value="option1">String</option>
          <option value="option2">Number</option>
        </select>
      </div>

      <table className="custom-table-pastOrder">
        <thead>
          <tr>
            <th>
              {" "}
              <input type="text" placeholder="Type" />
            </th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>cat food</td>
            <td>100</td>
          </tr>
        </tbody>
      </table>
      <div className="input-group">
        <label>Example:</label>
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>cat food</td>
                <td>100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <button className="custom-button">Save</button>
    </div>
  );

  const PastOrdersPriceCard: React.FC = () => (
    <div className="">
      <div className="input-group">
        <label>Type:</label>
        <select>
          <option value="option1">String</option>
          <option value="option2">Number</option>
        </select>
      </div>

      <table className="custom-table-pastOrder">
        <thead>
          <tr>
            <th>
              Type
            </th>
            <th><input type="text" placeholder="Price" /></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>cat food</td>
            <td>100</td>
          </tr>
        </tbody>
      </table>
      <div className="input-group">
        <label>Example:</label>
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>cat food</td>
                <td>100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <button className="custom-button">Save</button>
    </div>
  );

  return (
    <List>
      <div className="card-container">
        <div className="card">{transformedData.map(renderCategory)}</div>
        <div className="card" style={{ background: "lightgray" }}>
          <h2>{selectedCategory}</h2>
          <CardContainer selectedCategory={selectedCategory} />
        </div>
      </div>
    </List>
  );
};

export default Category2;
