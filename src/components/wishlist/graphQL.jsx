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
        created_at
        updated_at
        }
      }
     }`,
    "variables": {}
  };

  // クライアント側でソート（更新日時、降順）
  static sortWishesByUpdatedAt(wishes, order = 'DESC') {
    return wishes.sort((a, b) => {
      const dateA = new Date(a.updated_at);
      const dateB = new Date(b.updated_at);
      return order === 'DESC' ? dateB - dateA : dateA - dateB;
    });
  }

  // getWish IDを指定して取得
  static queryGetWish(id) {
    return {
      "operationName": "getWish",
      "query": `query getWish($id: ID!) {
        getWish(id: $id) {
          id
          content
          title
          created_at
          updated_at
        }
      }`,
      "variables": { id }
    };
  }

  // createWish 新規作成
  static queryCreateWish(data) {
    return {
      "operationName": "createWish",
      "query": `mutation createWish($createwishinput: CreateWishInput!) {
        createWish(input: $createwishinput) {
        content
        title
        created_at
        updated_at
      }
    }`,
      "variables": { 
        "createwishinput": {
          "title": data.title,
          "content": data.content
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
  static queryUpdateWish(id, data) {
    return {
      "operationName": "updateWish",
      "query": `mutation updateWish($updatewishinput: UpdateWishInput!) {
        updateWish(input: $updatewishinput) {
          id
          content
          title
          created_at
          updated_at
        }
      }`,
      "variables": { 
        "updatewishinput": {
          "id": id,
          "title": data.title, 
          "content": data.content
        }
      }
    };
  }

}