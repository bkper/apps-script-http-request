class HttpRequest {
  private url: string;
  private method: "get" | "delete" | "patch" | "post" | "put" = "get";
  private headers: any;
  private params = new Map<string,string>();
  private contentType = "application/json; charset=UTF-8";
  private payload: any;
  private validateHttpsCertificates = true;
  private followRedirects = true;
  private muteHttpExceptions = false;
  private escaping = true;

  constructor(url: string) {
    //TODO parse url
    this.url = url;
  }

  public setMethod(method: "get" | "delete" | "patch" | "post" | "put"): HttpRequest {
    this.method = method;
    return this;
  }

  public addHeader(name: string, value: string): HttpRequest {
    if (this.headers == null) {
      this.headers = new Object();
    }
    this.headers[name] = value;
    return this;
  }

  public addParam(name: string, value: string): HttpRequest {
    this.params.set(name, value);
    return this;
  }

  public setContentType(contentType: string): HttpRequest {
    this.contentType = contentType;
    return this;
  }

  public setPayload(payload: any): HttpRequest {
    this.payload = payload;
    return this;
  }

  public setValidateHttpsCertificates(validateHttpsCertificates: boolean): HttpRequest {
    this.validateHttpsCertificates = validateHttpsCertificates;
    return this;
  }

  public setFollowRedirects(followRedirects: boolean): HttpRequest {
    this.followRedirects = followRedirects;
    return this;
  }

  public setMuteHttpExceptions(muteHttpExceptions: boolean): HttpRequest {
    this.muteHttpExceptions = muteHttpExceptions;
    return this;
  }

  public getUrl(): string {
    let url = this.url;
    if (this.params.size > 0) {
      url += '?';
      let i = 0
      for (let [key, value] of this.params) {
        if (i > 0) {
          url += "&";
        }
        if (value != null) {
          url += key + "=" + encodeURIComponent(value);
          i++;
        }
      }
    }
    return url
  }

  public execute(): GoogleAppsScript.URL_Fetch.HTTPResponse {
  
    let options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {};

    if (this.headers != null) {
      options.headers = this.headers;
    }
    
    if (this.contentType != null) {
      options.contentType = this.contentType;
    }
    
    if (this.method != null) {
      options.method = this.method;
    }
    
    if (this.payload != null) {
      options.payload = this.payload;
    }

    options.validateHttpsCertificates = this.validateHttpsCertificates
    options.followRedirects = this.followRedirects;
    options.muteHttpExceptions = this.muteHttpExceptions;
    options.escaping = this.escaping;

    return UrlFetchApp.fetch(this.getUrl(), options);
    
  }; 


}


