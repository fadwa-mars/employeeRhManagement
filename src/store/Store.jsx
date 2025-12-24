import * as type from "./ActionsTypes"

const initialState = {
  employees: [],
  departements: [],
  selectedEmployee: null, 
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case type.ADD_EMPLOYEE:
      const newEmployee = {
        matricule: action.payload.matricule,
        nom: action.payload.nom,
        prenom: action.payload.prenom,
        poste: action.payload.poste,
        departement: action.payload.departement,
        salaire: action.payload.salaire,
        date_embauche: action.payload.date_embauche,
        email: action.payload.email,
        telephone: action.payload.telephone,
      };
      return {
        ...state,
        employees: [...state.employees, newEmployee],
      }

    case type.REMOVE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.matricule !== action.payload
        ),
      }

    case type.UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.map((emp) =>
          emp.matricule === action.payload.matricule ? action.payload : emp
        ),
        selectedEmployee: action.payload, 
      }

    case type.GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
      }

    case type.FIND_EMPLOYEE:
      return {
        ...state,
        selectedEmployee: action.payload, 
      }
      
    case type.GET_DEPARTEMENTS:
	    return {
		    ...state,
		    departements: action.payload,
	    } 

    default:
      return state
  }
}


export default reducer