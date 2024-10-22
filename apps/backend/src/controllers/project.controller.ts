import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { createProject, fetchProjects, fetchProjectById } from "../services/project.services";

/**
 * Creates a new project.
 *
 * This function handles the creation of a new project by validating the request,
 * calling the `createProject` service, and sending the appropriate response.
 *
 * @param req - The request object containing the project data.
 * @param resp - The response object used to send the response.
 *
 * @returns A JSON response with the status code, message, and project details if successful,
 * or an error message if the request is invalid or an error occurs.
 *
 * @throws Will return a 500 status code and an error message if an exception is thrown.
 */
export const create = async (req: Request, resp: Response) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return resp.status(400).json({ errors: errors.array() });
        }

        const { code, message, details } = await createProject(req.body);

        resp.status(code).json({ message, details });
    } catch (error: any) {
        resp.status(500).json({ error: error.toString() });
    }
}

/**
 * Retrieves a list of projects and sends them as a JSON response.
 * 
 * @param req - The request object.
 * @param resp - The response object.
 * 
 * @returns A promise that resolves to a JSON response containing the list of projects.
 * 
 * @throws Will return a 500 status code and an error message if fetching projects fails.
 */
export const getProjects = async (req: Request, resp: Response) => {
    try {
        const projects = await fetchProjects();

        resp.json(projects);
    } catch (error: any) {
        resp.status(500).json({ error: error.toString() });
    }
}

export const getProjectById = async (req: Request, resp: Response) => {
    try {
        const { code, message, details } = await fetchProjectById(req.params.id);

        resp.status(code).json({ message, details });
    } catch (error: any) {
        resp.status(500).json({ error: error.toString() });
    }
}
