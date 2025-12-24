import * as type from "./ActionsTypes"

export const addEmployee = (employee) => {
	return {type : type.ADD_EMPLOYEE, payload: employee} }
	
export const removeEmployee = (matricule) => {
	return {type : type.REMOVE_EMPLOYEE, payload: matricule} }
	
export const updateEmployee = (employee) => {
	return {type : type.UPDATE_EMPLOYEE, payload: employee} }
	
export const getEmployees = (employees) => {
	return {type : type.GET_EMPLOYEES, payload: employees} }
	
export const findEmployee = (employee) => {
	return {type : type.FIND_EMPLOYEE, payload: employee} }

export const getDepartements = (departement) => {
	return {type : type.GET_DEPARTEMENTS, payload: departement}
}
		