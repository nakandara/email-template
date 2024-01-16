import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Typography,
} from "@mui/material";

interface Category {
  title: string;
  subcategories?: Category[];
}

const Category2: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (title: string) => {
    if (expandedCategories.includes(title)) {
      setExpandedCategories(
        expandedCategories.filter((category) => category !== title)
      );
    } else {
      setExpandedCategories([...expandedCategories, title]);
    }
  };

  const renderCategory = (category: Category) => (
    <div key={category.title}>
      <ListItem button onClick={() => toggleCategory(category.title)}>
        <ListItemText primary={category.title} />
        {category.subcategories && category.subcategories.length > 0 && (
          <Typography variant="body2">
            {expandedCategories.includes(category.title) ? "[-]" : "[+]"}
          </Typography>
        )}
      </ListItem>
      {category.subcategories && category.subcategories.length > 0 && (
        <Collapse sx={{marginLeft:"50px"}} in={expandedCategories.includes(category.title)}>
          <List component="div" disablePadding>
            {category.subcategories.map(renderCategory)}
          </List>
        </Collapse>
      )}
    </div>
  );

  const data: Category[] = [
    {
      title: "User",
      subcategories: [
        { title: "Name" },
        { title: "Email" },
        {
          title: "Address",
          subcategories: [
            { title: "Address Line 01" },
            { title: "Address Line 02" },
          ],
        },
      ],
    },
  ];

  const dataNew: Category[] = [
    {
      title: "client",
      subcategories: [
        { title: "Name" },
        { title: "Email" },
        {
          title: "Address",
         
        },
      ],
    },
  ];

  return (
    <List>
      <div className="card-container">
        <div className="card">{data.map(renderCategory)}</div>
      
        <div className="card" style={{background:"lightgray"}}> Content</div>
      </div>
    </List>
  );
};

export default Category2;

// import React, { useState } from 'react';

// interface Category {
//   title: string;
//   subcategories?: Category[];
//   reSubcategories?: Category[];
// }

// const Category2 = () => {
//   const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

//   const toggleCategory = (title: string) => {
//     if (expandedCategories.includes(title)) {
//       setExpandedCategories(expandedCategories.filter((category) => category !== title));
//     } else {
//       setExpandedCategories([...expandedCategories, title]);
//     }
//   };

//   const renderCategory = (category: Category) => {
//     const subcategoriesKey: 'subcategories' = 'subcategories';
//     const reSubcategoriesKey: 'reSubcategories' = 'reSubcategories';

//     return (
//       <li key={category.title}>
//         <div
//           style={{ cursor: 'pointer' }}
//           onClick={() => toggleCategory(category.title)}
//         >
//           {category.title} {category[subcategoriesKey] && category[subcategoriesKey]?.length > 0 && (
//             <span>{expandedCategories.includes(category.title) ? '[-]' : '[+]'}</span>
//           )}
//         </div>
//         {expandedCategories.includes(category.title) && category[subcategoriesKey] && category[subcategoriesKey]?.length > 0 && (
//           <ul>{category[subcategoriesKey]?.map(renderCategory)}</ul>
//         )}
//         {expandedCategories.includes(category.title) && category[reSubcategoriesKey] && category[reSubcategoriesKey]?.length > 0 && (
//           <ul>{category[reSubcategoriesKey]?.map(renderCategory)}</ul>
//         )}
//       </li>
//     );
//   };

//   const data: Category[] = [
//     {
//       title: "User",
//       subcategories: [
//         { title: "Name" },
//         { title: "Email" },
//         {
//           title: "Address",
//           subcategories: [
//             { title: "Address Line 01" },
//             { title: "Address Line 02" },
//           ],
//         },
//         {
//           title: "postalCode",
//           subcategories: [
//             {
//               title: "new City Postal Code",
//               reSubcategories: [
//                 { title: "new City Lane Postal Code one" },
//                 { title: "new City Lane Postal Code two" },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ];

//   return <ul>{data.map(renderCategory)}</ul>;
// };

// export default Category2;
