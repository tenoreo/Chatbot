import React from "react";
import styles from "./homepage.module.css";
import FAB from "@/components/FloatingButton/FAB";
const page = () => {
  return (
    <div className={styles.mainWrapper}>
      <h1>Bienvenidos a mi Mini Bot Conversacional</h1>
      <FAB />
    </div>
  );
};

export default page;
