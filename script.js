$(document).ready(function () {
    // Placeholder JSON data source
    const apiURL = "https://jsonplaceholder.typicode.com/posts"; // Replace with actual API

    // Fetch products dynamically
    $.ajax({
        url: apiURL,
        method: "GET",
        success: function (data) {
            let productHTML = "";
            data.slice(0, 6).forEach(function (product) { // Display 6 products
                productHTML += `
                    <div class="item">
                        <h3>${product.title}</h3>
                        <p>${product.body}</p>
                        <p>Price: $${(Math.random() * 100).toFixed(2)}</p>
                        <img src="https://via.placeholder.com/150" alt="Product Image">
                    </div>
                `;
            });
            $("#products").html(productHTML);
        },
        error: function () {
            console.log("Error fetching data");
        },
    });
    
});

