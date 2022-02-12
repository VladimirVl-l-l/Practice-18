import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
   const { isLoading, getQualities } = useQualities();
   const qualitiesInUse = getQualities(qualities);

   if (!isLoading) {
      return (
         <>
            {qualitiesInUse.map((qual) => (
               <Quality key={qual._id} {...qual} />
            ))}
         </>
      );
   } else return "Loading...";
};

QualitiesList.propTypes = {
   qualities: PropTypes.array.isRequired
};

export default QualitiesList;
