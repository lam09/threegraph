var importer= [
    
    'js/view/myWindow.js',
    'js/model/ball.js',
    'js/model/plane.js',
    'js/model/sea.js',
    'js/model/cloud.js',
    'js/model/sky.js'
    
];

for (let i=0; i<importer.length; i++) {
    var imported = document.createElement('script');
    imported.src = importer[i];
    document.head.appendChild(imported);
}
