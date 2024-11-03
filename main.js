$(document).ready(function () {
    const githubLink = $('.profile-link');

    $('#button-search').click(function () {
        const userName = $('#profile-search').val().trim();
        

        if (userName) {
            const endpoint = `https://api.github.com/users/${userName}`;
            
            fetch(endpoint)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Usuário não encontrado');
                    }
                    return response.json();
                })
                .then(data => {
                    
                    $('#profile-avatar').attr('src', data.avatar_url);
                    $('#profile-name').text(data.name || 'Nome não disponível');
                    $('#profile-username').text(`@${data.login}`);
                    $('#repo-count').text(data.public_repos);
                    $('#follower-count').text(data.followers);
                    $('#following-count').text(data.following);
                    
                    
                    githubLink.attr('href', data.html_url);
                    $('#button-search').addClass('d-none'); 
                    $('.profile-link').removeClass('d-none');
                    
                })
                .catch(error => {
                    alert(error.message);
                    githubLink.hide(); 
                });
        } else {
            alert('Digite um nome de usuário');
            githubLink.hide();
        }
    });

});
