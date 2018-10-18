import React from 'react';

const RepoList = (props) => (
  <div>
  {console.log('props', props.repos)}
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.

        <table>
          <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Owner</th>
            <th>Description</th>
            <th>Link</th>
          </tr>
          </thead>
          <tbody>
    {props.repos.map(function(repo) {
      return (
          <tr key={repo._id}>
            <td>{repo.id}</td>
            <td>{repo.name}</td>
            <td>{repo.owner}</td>
            <td>{repo.description}</td>
            <td><a href={repo.html_url}>{repo.html_url}</a></td>

          </tr>
      )
    })}
        </tbody>
        </table>
  </div>
)

export default RepoList;
