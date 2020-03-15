import * as firebase from "firebase/app";
import { FB_API_KEY } from "../../../util/secrets";

const firebaseConfig = {
  apiKey: FB_API_KEY,
  authDomain: "stafsetning-api.firebaseapp.com",
  databaseURL: "https://stafsetning-api.firebaseio.com",
  projectId: "stafsetning-api",
  storageBucket: "stafsetning-api.appspot.com",
  messagingSenderId: "1092853852922",
  appId: "1:1092853852922:web:9faa770b1cb429d5bdb743",
  measurementId: "G-DRM4CRLHQL"
};

export const app = firebase.initializeApp(firebaseConfig);



