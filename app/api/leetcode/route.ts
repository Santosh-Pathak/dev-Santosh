import { NextResponse } from "next/server";

const LEETCODE_USERNAME = "21011177";
const LEETCODE_API      = "https://leetcode.com/graphql";

const QUERY = `
  query userStats($username: String!) {
    matchedUser(username: $username) {
      username
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
      profile {
        ranking
      }
    }
    userContestRanking(username: $username) {
      rating
      globalRanking
      attendedContestsCount
      topPercentage
    }
  }
`;

export interface LeetCodeStats {
  username:          string;
  totalSolved:       number;
  easySolved:        number;
  mediumSolved:      number;
  hardSolved:        number;
  ranking:           number;
  contestRating:     number;
  contestRank:       number;
  contestsAttended:  number;
  topPercentage:     number;
}

export interface LeetCodeResponse {
  status: "ok" | "error";
  data?:  LeetCodeStats;
  error?: string;
}

export async function GET() {
  try {
    const res = await fetch(LEETCODE_API, {
      method:  "POST",
      headers: {
        "Content-Type":  "application/json",
        "Referer":       "https://leetcode.com",
        "User-Agent":    "Mozilla/5.0",
      },
      body: JSON.stringify({ query: QUERY, variables: { username: LEETCODE_USERNAME } }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`LeetCode API responded ${res.status}`);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const json: any = await res.json();
    const user    = json?.data?.matchedUser;
    const contest = json?.data?.userContestRanking;

    if (!user) throw new Error("User not found");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const acStats: any[] = user.submitStats?.acSubmissionNum ?? [];
    const get = (d: string) => acStats.find((s: { difficulty: string }) => s.difficulty === d)?.count ?? 0;

    const data: LeetCodeStats = {
      username:         user.username,
      totalSolved:      get("All"),
      easySolved:       get("Easy"),
      mediumSolved:     get("Medium"),
      hardSolved:       get("Hard"),
      ranking:          user.profile?.ranking ?? 0,
      contestRating:    Math.round(contest?.rating ?? 0),
      contestRank:      contest?.globalRanking ?? 0,
      contestsAttended: contest?.attendedContestsCount ?? 0,
      topPercentage:    Math.round((contest?.topPercentage ?? 0) * 10) / 10,
    };

    return NextResponse.json<LeetCodeResponse>({ status: "ok", data });
  } catch (err) {
    console.error("[/api/leetcode]", err);
    return NextResponse.json<LeetCodeResponse>(
      { status: "error", error: String(err) },
      { status: 500 }
    );
  }
}
