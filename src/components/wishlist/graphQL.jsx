export class GraphQL {

  static ENDPOINT = import.meta.env.VITE_WISHLIST_GRAPHQL_ENDPOINT;
  static API_KEY = import.meta.env.VITE_WISHLIST_GRAPHQL_API_KEY;
  static REQUEST_TIMEOUT_MS = 5000;

  static headers = {
    "Access-Control-Allow-Origin": "*",
    "content-type": "application/json",
    "x-api-key": this.API_KEY
  }
  
  // GraphQL API
  // getWishes　リスト取得
  static queryListWishes = {
    "operationName": "listWishes",
    "query": `query listWishes {
     listWishes {
      items {
        id 
        content 
        title
        }
      }
     }`,
    "variables": {}
  };

  // getWish IDを指定して取得
  static queryGetWish(id) {
    return {
      "operationName": "getWish",
      "query": `query getWish($id: ID!) {
        getWish(id: $id) {
          id
          content
          title
        }
      }`,
      "variables": { id }
    };
  }

  // createWish 新規作成
  static queryCreateWish(title, content) {
    return {
      "operationName": "createWish",
      "query": `mutation createWish($createwishinput: CreateWishInput!) {
        createWish(input: $createwishinput) {
        content
        title
      }
    }`,
      "variables": { 
        "createwishinput": {
          "title": title,
          "content": content
        }
      }
    };
  }

  // deleteWish IDを指定して削除
  static queryDeleteWish(id) {
    return {
      "operationName": "deleteWish",
      "query": `mutation deleteWish($deletewishinput: DeleteWishInput!) {
        deleteWish(input: $deletewishinput) {
          id
        }
      }`,
      "variables": { 
        "deletewishinput": {
          "id": id
        }
      }
    };
  }

  // updateWish IDを指定して更新
  static queryUpdateWish(id, title, content) {
    return {
      "operationName": "updateWish",
      "query": `mutation updateWish($updatewishinput: UpdateWishInput!) {
        updateWish(input: $updatewishinput) {
          id
          content
          title
        }
      }`,
      "variables": { 
        "updatewishinput": {
          "id": id,
          "title": title, 
          "content": content
        }
      }
    };
  }

}