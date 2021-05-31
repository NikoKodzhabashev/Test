import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { request, gql } from "graphql-request";

require("../mocks");

const endpoint = "https://devapi.podkrepime.bg/graphql";

const queryClient = new QueryClient();

export default function IndexPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        Test
        <Posts />
      </div>
    </QueryClientProvider>
  );
}

function Posts() {
  const { status, data, error, isFetching } = usePosts();

  return (
    <div>
      <h1>Posts</h1>
    </div>
  );
}

function usePosts() {
  return useQuery("Launches", async () => {
    const {
      posts: { data }
    } = await request(
      endpoint,
      gql`
        query TrainingList {
          trainings(pagination: { page: 1 }) {
            items {
              type
              title
              category {
                id
                name
              }
              description
            }
            pagination {
              totalPages
              currentPage
            }
          }
        }
      `
    );
    return data;
  });
}
