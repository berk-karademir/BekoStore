import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useHistory } from "react-router-dom";

function Bread() {
  const [currentPage, setCurrentPage] = useState("");
  const history = useHistory();

  useEffect(() => {
    const path = history.location.pathname;
    const formattedPath =
      path === "/"
        ? "Home"
        : path.startsWith("/shop")
        ? "Shop"
        : path.slice(1, 2).toUpperCase() + path.slice(2);
    setCurrentPage(formattedPath);
  }, [history.location.pathname]);

  console.log(history.location.pathname, currentPage);

  return (
    <Breadcrumb className="flex justify-center items-center py-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            className={currentPage === "Home" ? "text-black font-[700]" : ""}
          >
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        {currentPage !== "Home" && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-[700]">{currentPage}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default Bread;
