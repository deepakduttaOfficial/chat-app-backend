import passport from "passport";

export interface JwtResponse {
  exp: number;
  fullName: string;
  iat: number;
  password: string;
  role: string;
  virtualNumber: number;
  _id: string;
}

export const jwtAuthMiddleware = passport.authenticate("jwt", {
  session: false,
});
