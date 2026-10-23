FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["src/PortfolioAuth.Api/PortfolioAuth.Api.csproj", "src/PortfolioAuth.Api/"]
RUN dotnet restore "src/PortfolioAuth.Api/PortfolioAuth.Api.csproj"

COPY . .
WORKDIR "/src/src/PortfolioAuth.Api"
RUN dotnet build "PortfolioAuth.Api.csproj" -c Release -o /app/build
RUN dotnet publish "PortfolioAuth.Api.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000

ENTRYPOINT ["dotnet", "PortfolioAuth.Api.dll"]
