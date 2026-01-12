declare module './openapi' {
  export interface paths {
    '/api/profile/me/profile-image/presign-put': {
      parameters: {
        query?: never;
        header?: never;
        path?: never;
        cookie?: never;
      };
      get?: never;
      put?: never;
      post: {
        parameters: {
          query?: never;
          header?: never;
          path?: never;
          cookie?: never;
        };
        requestBody: {
          content: {
            'application/json': {
              contentType: string;
              fileName?: string;
            };
          };
        };
        responses: {
          200: {
            headers: {
              [name: string]: unknown;
            };
            content: {
              'application/json': {
                success?: boolean;
                data?: {
                  key: string;
                  uploadUrl: string;
                  fileUrl: string;
                };
              };
            };
          };
          400?: {
            headers: {
              [name: string]: unknown;
            };
            content?: never;
          };
          401?: {
            headers: {
              [name: string]: unknown;
            };
            content?: never;
          };
        };
      };
      delete?: never;
      options?: never;
      head?: never;
      patch?: never;
      trace?: never;
    };
  }
}

export {};
