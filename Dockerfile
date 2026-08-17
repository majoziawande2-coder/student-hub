FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src

COPY . .

WORKDIR "/src/Student Accomodation/Student Accomodation"

RUN dotnet restore "Student Accomodation.csproj"

RUN dotnet publish "Student Accomodation.csproj" -c Release -o /app/publish --no-restore


FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final

WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://0.0.0.0:10000

EXPOSE 10000

ENTRYPOINT ["dotnet", "Student Accomodation.dll"]
