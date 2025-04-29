///Users/santosa/Documents/GitHub/Software-System-Planning/ Software_Quality(Pepe)/Exercise09-10/sharedComponent/spinner.tsx
import * as React from "react";

function Spinner() {
  return (
    <div className="lds-ripple" aria-label="loading...">
      <div />
      <div />
    </div>
  );
}

export default Spinner;
