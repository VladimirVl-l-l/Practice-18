import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import qualitiesService from "../serviсes/quality.service";

const QualitiesContext = React.createContext();

export const useQualities = () => {
   return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
   const [isLoading, setLoading] = useState(true);
   const [qualities, setQualities] = useState([]);
   const [error, setError] = useState(null);
   useEffect(() => {
      if (error !== null) {
         toast(error);
         setError(null);
      }
   }, [error]);

   useEffect(() => {
      getQualitiesList();
   }, []);
   function errorCatcher(error) {
      const { message } = error.response.data;
      setError(message);
   }
   function getQualities(userQualities) {
      const newQual = [];
      qualities.forEach(function (item) {
         if (userQualities.includes(item._id)) {
            return newQual.push(item);
         }
      });
      return newQual;
   }

   async function getQualitiesList() {
      try {
         const { content } = await qualitiesService.get();
         setQualities(content);
         setLoading(false);
      } catch (error) {
         errorCatcher(error);
      }
   }

   return (
      <QualitiesContext.Provider value={{ isLoading, qualities, getQualities }}>
         {children}
      </QualitiesContext.Provider>
   );
};

QualitiesProvider.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
   ])
};
