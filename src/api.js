import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes
  //Get list of companies
  // static async findAllCompanies(searchFilters={}) {
  //   let response = await this.request('companies', searchFilters)
  //   return response.companies;
  // }

  //#################################need to use name since in the backend, company.js, findAll function expects 'name'
  static async findAllCompanies(name) {
    let response = await this.request('companies', {name})
    return response.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let response = await this.request(`companies/${handle}`);
    return response.company;
  }

  static async findAllJobs() {
    let response = await this.request('jobs/')
    return response.jobs;
  }
  // obviously, you'll add a lot here ...

  static async signUp(data){
    //#####################to change method use 'post'
    let response = await this.request('auth/register', data, 'post')
    console.log(response)
    return response.token
  }

//#################################
  static async Login(data){
    let response = await this.request('auth/token', data, 'post')
    return response.token
  }

  static async getCurrentUser(username){
    let response = await this.request(`users/${username}`)
    // return response.user
    console.log('reponse to getCurrentUser',response.user)
    return response.user
  }

  static async updateUserInfo(username, data) {
    let response = await this.request(`users/${username}`, data, 'patch')
    console.log('response to updateUserInfo function', response)
    return response
  }
// sends request to /:username/jobs/:id, has 'ensureCorrectUserOrAdmin middleware, return json - '{applied: jobId}
// has embedded function applyToJob(req.params.username, JobId); checks if there is job with that id, checks if there is user with that username, then inserts into applicatiions job_id and username
// thus pass in username and job id via parameters; 
  static async applyForJob(username, id) {
    let response = await this.request(`users/${username}/jobs/${id}`, {}, 'post')
    console.log('response from api to apply for job', response)
    return response
    }
}
  

  
  



// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi
