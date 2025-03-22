import type { Project } from "$lib/types/sprintlog";
import type { QueryFunctionContext } from "@tanstack/svelte-query";
import axiosInstance from "./axiosInstance";

export const listProjects = async (context: QueryFunctionContext) => {
    const currentPage = 1,
    pageSize = 200,
    sortOrder = 'asc'
    return (
        await axiosInstance.get<Project[]>(`api/projects?currentPage=${currentPage}&pageSize=${pageSize}&sortOrder=${sortOrder}`)
    ).data;
};