export const inputStyles = {
  input: {
    minHeight: "3.0125rem",
    fontSize: "1rem",
    backgroundColor: "transparent",
    border: "1px #D0D0D0 solid",
    borderRadius: "0.6rem",
    color: "black",
    "&:focus": {
      border: "1px #15994B solid",
    },
  },
  //   invalid: {
  //     border: "2px red solid",
  //   },
  select: {
    backgroundColor: "#fff",
    border: "1px #000 solid",
    borderRadius: "0.6rem",
    color: "black",

    "&:focus": {
      border: "1px #15994B solid",
    },
  },
  item: {
    fontSize: "1rem",
  },
};

export const inputStyles2 = {
  input: {
    minHeight: "3.5rem",
    fontSize: "1rem",
    // backgroundColor: "#181919",
    backgroundColor: "transparent",
    border: "1px #D0D0D0 solid",
    borderRadius: "0.6rem",
    color: "black",

    "&:focus": {
      border: "1px #15994B solid",
    },
  },
  //   invalid: {
  //     border: "2px red solid",
  //   },
  item: {
    fontSize: "1rem",
  },
};

export const selectInputStyles = {
  input: {
    minHeight: "3.0125rem",
    maxHeight: "6rem",
    overflow: "auto",
    fontSize: "1rem",
    // backgroundColor: "#181919",
    backgroundColor: "transparent",
    border: "1px #D0D0D0 solid",
    borderRadius: "0.6rem",
    color: "black",

    "&:focus": {
      border: "1px #15994B solid",
    },
  },
  //   invalid: {
  //     border: "2px red solid",
  //   },
  // dropdown: {
  //   border: "1px rgba(255, 255, 255, 0.08) solid",
  //   backgroundColor: "#181919",
  // },

  item: {
    fontSize: ".95rem",
    // color: "white",

    "&:hover": {
      backgroundColor: "#262626",
    },

    // Mouse out
    "&:not(:hover)": {
      backgroundColor: "white",
      color: "black",
    },

    // Selected item from mantine select give it a background color
    "&[aria-selected=true]": {
      backgroundColor: "#15994B",
      color: "white",

      "&:hover": {
        backgroundColor: "#15994B",
      },
    },
  },
};

export const dateInputStyles = {
  input: {
    height: "3rem",
    minHeight: "3rem",
    fontSize: "1rem",
    // backgroundColor: "#181919",
    backgroundColor: "transparent",
    border: "1px #D0D0D0 solid",
    borderRadius: "0.6rem",
    color: "black",

    "&:focus": {
      border: "1px #15994B solid",
    },
  },

  calendar: {
    // border: "1px rgba(255, 255, 255, 0.08) solid",
    // backgroundColor: "#181919",
  },

  item: {
    fontSize: "1rem",
    color: "white",

    // "&:hover": {
    //   backgroundColor: "#262626",
    // },

    // // Mouse out
    // "&:not(:hover)": {
    //   backgroundColor: "#181919",
    // },

    // // Selected item from mantine select give it a background color
    // "&[aria-selected=true]": {
    //   backgroundColor: "rgba(0, 240, 197, 0.3)",

    //   "&:hover": {
    //     backgroundColor: "rgba(0, 240, 197, 0.3)",
    //   },
    // },
  },
  day: {
    "&:focus": {
      backgroundColor: "#15994B",
    },
    "&:hover": {
      backgroundColor: "#15994B",
    },
    "&[aria-selected=true]": {
      backgroundColor: "#15994B",
      color: "white",

      "&:hover": {
        backgroundColor: "#15994B",
      },
    },
  },
};
