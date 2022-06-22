export const POSLOVNICA_ACTION  = {
    ADD_POSLOVNICA: "poslovnica/add",
    BANKRUPTCY_POSLOVNICA: "poslovnica/delete",
    UPDATE_POSLOVNICA: "poslovnica/update",
    ADD_ARTIKAL: "artikal/add",
    TRANSFER_ARTIKAL: "artikal/transfer"
 };

 export const poslovnicaAction = (tip, podaci) => {
    return {
    type: tip,
    payload: podaci
    };
};
