var blogsData;
var latestBlogContainer = document.getElementById("latest_blogs");
var popularBlogContainer = document.getElementById("most_popular");
// Create an instance of DataFetcher for services
const blogsFetcher = new DataFetcher('assets/data/blogs.json', 'latest_blogs');
// Fetch the data with success and error handling
blogsFetcher.fetchData(
    (data)=>{
        blogsData = data;
        //Displaying the latest blogs
        latestBlogContainer.innerHTML = "";
        data.latestBlogs.forEach((elem,indx)=>{
            latestBlogContainer.innerHTML += latestBlogCard(elem,indx);
        })

        // displaying the most popular blogs
        popularBlogContainer.innerHTML = "";
        data.mostPopularBlogs.forEach((elem, indx)=>{
            popularBlogContainer.innerHTML += popularBlogCard(elem,indx);
        })
    },  // This function will render the services after data is fetched
    (error) => {
        console.error('Error loading services:', error);
    }
);


function latestBlogCard(elem,indx) {
    return `
        <div class="col">
            <div class="card h-100 blog_card" onclick="handelBlog('latest',${indx})">
                <img src="${elem.imageUrl}"
                    class="card-img-top" alt="Blog Thumbnail">
                <div class="card-body">
                    <p class="date mb-2">${elem.date}</p>
                    <h5 class="card-title title">${elem.title}</h5>
                </div>
            </div>
        </div>
    `;
}
function popularBlogCard(elem,indx) {
    return `
        <div class="card mb-3 recent_blog_card" onclick="handelBlog('popular',${indx})">
            <div class="row g-0">
                <div class="col-4">
                    <img src="${elem.imageUrl}"
                        class="img-fluid rounded-start" alt="Recent Thumbnail">
                </div>
                <div class="col-8">
                    <div class="card-body p-2">
                        <h6 class="card-title mb-1">${elem.title}</h6>
                        <p class="date small mb-0">${elem.date}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}


function handelBlog(typ, id){
    var modal = new CustomModal("blogsModal");
    if(typ=="latest"){
        modal.setTitle(blogsData.latestBlogs[id].title);
        modal.setBody(`<img src="${blogsData.latestBlogs[id].imageUrl}" class="w-100"><br><p class="modaL_blog_desc">${blogsData.latestBlogs[id].description}</p>`);
    }else{
        modal.setBody(`<img src="${blogsData.mostPopularBlogs[id].imageUrl}" class="w-100"><br><p class="modaL_blog_desc">${blogsData.latestBlogs[id].description}</p>`);
        modal.setTitle(blogsData.mostPopularBlogs[id].title);
    }
    // modal.setBody(blogsData.latestBlogs[id].shortDescription);
    modal.setFooter('');
    modal.show();
}
