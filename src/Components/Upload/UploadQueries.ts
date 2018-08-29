import { gql } from "apollo-boost";

export const UPLOAD_SHOWNIMAGE = gql`
  mutation uploadShownImage($file: Upload!) {
    UploadShownImage(file: $file) {
      ok
      error
      shownImage {
        id
        url
      }
    }
  }
`;
