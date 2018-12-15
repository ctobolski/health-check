const tenSeconds = 10000
export const environments = [
    {name : "Dev",apps :[
            {url: "http://localhost:8081/actuator/health", name: "Auth",interval:tenSeconds}, 
            {url: "http://localhost:8081/actuator/health", name: "API_ONE",interval:tenSeconds}, 
            {url: "http://localhost:8081/actuator/health", name: "API_TWO",interval:tenSeconds}
    ]},
    {name : "QA",apps :[
            {url: "http://localhost:8081/actuator/health", name: "Auth",interval:tenSeconds}, 
            {url: "http://localhost:8081/actuator/health", name: "API_ONE",interval:tenSeconds}, 
            {url: "http://localhost:8081/actuator/health", name: "API_TWO",interval:tenSeconds}
    ]},
    {name : "Prod",apps :[
            {url: "http://localhost:8081/actuator/health", name: "Auth",interval:tenSeconds}, 
            {url: "http://localhost:8081/actuator/health", name: "API_ONE",interval:tenSeconds}, 
            {url: "http://localhost:8081/actuator/health", name: "API_TWO",interval:tenSeconds}
    ]}
]