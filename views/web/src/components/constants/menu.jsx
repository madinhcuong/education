const menu = [
    {
      name: "Trang chủ",
      to: "/",
      exact: true
    },
    {
      name: "Giới thiệu",
      to: "/gioi-thieu",
      exact: false
    },
    {
      name: "Lịch khai giảng",
      to: "/lich-khai-giang",
      exact: false
    },
    {
      name: "Đào tạo",
      to: "/dao-tao",
      exact: false,
      isSubMenu: true,
      sub_menu: "TRAINING"
      // [
      //   {
      //     name: "Lập trình reactjs",
      //     to: "/dao-tao/747467468484684",
      //     exact: false,
      //   },
      //   {
      //     name: "Lập trình Nodejs",
      //     to: "/dao-tao/ttttt/dfbd/gffgsfg",
      //     exact: false,
      //   }
      // ]
    },
    {
      name: "Tra cứu",
      to: "/tra-cuu",
      exact: false
    },
    {
      name: "Tin tức",
      to: "/tin-tuc",
      exact: false,
      isSubMenu: true,
      sub_menu: "NEWS"
      // [
      //   {
      //     name: "công nghệ thông tin",
      //     to: "/tin-tuc/fgfgfdg",
      //     name_tp: "Tin tức",
      //   },
      //   {
      //     name: "tuyển dụng",
      //     to: "/tin-tuc/fsf/fsfdf",
      //     name_tp: "Tin tức",
      //   }
      // ]
    },
    {
      name: "Liên hệ",
      to: "/lien-he",
      exact: false
    }
  ];

  export default menu;



  // const menu = [
  //   {
  //     name: "Trang chủ",
  //     to: "/",
  //     exact: true
  //   },
  //   {
  //     name: "Giới thiệu",
  //     to: "/gioi-thieu",
  //     exact: false
  //   },
  //   {
  //     name: "Lịch khai giảng",
  //     to: "/lich-khai-giang",
  //     exact: false
  //   },
  //   {
  //     name: "Đào tạo",
  //     to: "/dao-tao",
  //     exact: false,
  //     isSubMenu: true,
  //     sub_menu: [
  //       {
  //         name: "Lập trình reactjs",
  //         to: "/dao-tao/747467468484684",
  //         exact: false,
  //       },
  //       {
  //         name: "Lập trình Nodejs",
  //         to: "/dao-tao/ttttt/dfbd/gffgsfg",
  //         exact: false,
  //       }
  //     ]
  //   },
  //   {
  //     name: "Tra cứu",
  //     to: "/tra-cuu",
  //     exact: false
  //   },
  //   {
  //     name: "Tin tức",
  //     to: "/tin-tuc",
  //     exact: false,
  //     isSubMenu: true,
  //     sub_menu: [
  //       {
  //         name: "công nghệ thông tin",
  //         to: "/tin-tuc/fgfgfdg",
  //         name_tp: "Tin tức",
  //       },
  //       {
  //         name: "tuyển dụng",
  //         to: "/tin-tuc/fsf/fsfdf",
  //         name_tp: "Tin tức",
  //       }
  //     ]
  //   },
  //   {
  //     name: "Liên hệ",
  //     to: "/lien-he",
  //     exact: false
  //   }
  // ];

  // export default menu;