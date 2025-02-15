export namespace models {
	
	export class Response {
	    status: number;
	    message?: string;
	    error?: string;
	
	    static createFrom(source: any = {}) {
	        return new Response(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.status = source["status"];
	        this.message = source["message"];
	        this.error = source["error"];
	    }
	}
	export class Task {
	    id: number;
	    task: string;
	    status: string;
	    date: string;
	    priority: string;
	
	    static createFrom(source: any = {}) {
	        return new Task(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.task = source["task"];
	        this.status = source["status"];
	        this.date = source["date"];
	        this.priority = source["priority"];
	    }
	}

}

