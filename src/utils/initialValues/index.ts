export const checkInFormInput = {
  name: "",
  phone: "",
};

export const confirmationPageInput = {
  selectedRecommendations: [] as Array<{
    serviceName: string;
    opcode: string;
    price: string;
    comment: string;
    serviceCategoryId: string;
    serviceCategoryName: string;
    sabCode: string;
  }>,
  recommendationsPagination: {
    limit: 10,
    page: 0,
    total: 1,
  } as {
    limit: number;
    page: number;
    total: number;
  },
  appointmentId: "" as string,
  vin: "" as string,
  year: "" as string,
  make: "" as string,
  model: "" as string,
};
