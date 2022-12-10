import { useState } from "react";
import { GetServerSideProps } from "next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { CustomersTable } from "../components/CustomersTable";
import { convertDate } from "../utils/convertDate";
import { api } from "../services/axios";

interface IHomePageProps {
  customers: ICustomer[];
}

export default function HomePage({ customers }: IHomePageProps) {
  const [customersList, setCustomersList] = useState<ICustomer[]>(customers);

  return (
    <Box
      minWidth="100vh"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="#FAFAFA"
    >
      <Typography
        variant="h4"
        marginBottom={1}
        marginLeft="2.5%"
        alignSelf="flex-start"
      >
        Customers
      </Typography>
      <CustomersTable
        setCustomersList={setCustomersList}
        customers={customersList}
      />
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (_) => {
  try {
    const response = await api.get<ICustomer[]>("/customers");

    console.log(response);

    response.data.forEach((customer) => {
      customer.CreatedAt = convertDate(customer.CreatedAt);
      customer.UpdatedAt = convertDate(customer.UpdatedAt);
    });

    return {
      props: {
        customers: response.data,
      },
    };
  } catch (err) {
    console.warn(err);
    console.log("asdasd");
    return {
      props: {
        customers: [],
      },
    };
  }
};
