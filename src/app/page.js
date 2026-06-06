'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const navItems = ['Ovoz', 'Chizmachilik', 'Dizayn', 'AI', 'Ijodkorlar', 'Kirish']

const MAIN_WORD = 'Chizmachilik'
const SUFFIX = 'dan'
const TOTAL_DURATION = 2.2
const CHAR_FADE = 0.22

const S3_LINE1 = 'Raqamli'
const S3_LINE2 = 'dizayngacha'

const S4_PART1  = 'Barcha '    // SF Pro
const S4_ITALIC = 'manbalar'   // PPE italic
const S4_PART2  = ' bir joyda:' // SF Pro

const HAND_PATH = "M718.838 300.529C706.339 292.759 697.184 280.332 694.463 263.663C693.817 259.743 685.954 257.945 682.402 260.32C660.795 274.891 638.611 284.551 615.458 295.134C607.387 298.822 604.089 301.843 595.695 295.941C578.884 284.136 567.239 269.081 558.822 249.806L532.256 188.894C524.185 170.403 512.909 153.319 498.98 139.601C453.551 94.8043 382.225 160.881 348.719 206.393C388.221 208.929 424.795 246.348 430.791 280.493C433.558 296.24 427.101 309.151 412.481 313.716C372.125 326.328 320.239 303.364 320.401 264.77C320.47 245.795 330.132 230.348 337.973 213.194C283.227 232.054 246.054 272.447 186.005 275.721C165.066 276.851 143.32 277.727 122.52 275.536C81.0341 271.156 40.8399 265.599 0 252.85C41.4164 255.824 79.074 268.228 120.168 270.948C200.049 276.251 225.138 269.358 291.529 229.287C307.141 219.857 324.206 212.825 341.616 207.753C362.601 181.193 384.601 155.44 413.887 137.434C451.13 114.54 481.962 110.459 511.156 145.596C524.185 161.273 533.156 179.326 541.434 198.139L567.492 257.392C574.895 274.199 588.731 286.349 602.221 293.358C618.71 270.626 673.893 210.451 680.281 224.976C684.362 234.244 683.163 245.933 682.702 255.063L707.63 254.348C741.552 253.38 789.587 298.108 760.715 300.021C735.418 301.704 717.615 286.995 700.643 268.735C705.785 290.084 723.98 301.75 744.85 303.618C779.579 306.754 820.903 311.964 814.769 341.959C817.836 346.801 821.572 355.723 820.257 361.626C809.649 367.159 793.945 368.727 782.83 361.995C775.566 357.591 777.203 340.069 785.597 336.103C789.541 334.236 796.343 333.913 803.262 332.852C798.649 328.979 791.616 325.405 785.136 323.838L734.772 311.711L714.987 306.938C719.552 337.74 725.548 363.585 755.019 365.384L788.688 367.436C807.781 368.611 820.857 373.983 833.056 388.716C846.846 405.362 862.434 420.463 878.369 435.173C897.855 453.133 918.287 467.635 945.129 472.822C949.718 473.698 962.378 473.307 963.992 468.903L971.21 449.444L941.808 448.015C919.44 443.15 898.57 435.196 880.237 421.893C863.818 409.996 855.24 392.451 847.261 374.122C824.523 321.832 800.356 276.205 744.619 257.622C730.506 252.919 717.293 243.72 707.331 232.999L685.169 209.16C672.809 195.857 673.339 179.625 686.299 167.475C694.371 159.89 702.695 155.625 714.318 161.688L710.075 154.633C708.991 152.858 711.989 147.993 713.88 146.748C736.825 131.762 729.653 104.28 743.927 75.599C751.376 60.6129 768.095 55.4485 782.922 62.7802C804.276 73.3626 822.955 85.8126 842.556 100.199C846.039 102.758 848.252 109.86 849.129 115.439C889.484 83.5071 928.802 51.2293 970.887 21.3033C986.914 9.91387 1003.24 1.08361 1023.42 0C1033.33 6.43249 1043.57 22.4791 1044.57 32.8772L1032.32 47.8402C994.155 75.0687 954.353 97.8937 912.914 119.843C905.673 123.67 896.887 123.854 887.64 126.367C899.885 131.716 912.06 135.013 921.561 140.685C937.404 166.622 951.816 192.075 960.948 220.987C982.279 288.494 1016.57 333.659 1083.61 359.505C1152.46 386.041 1222.29 404.786 1294.42 420.256C1319.24 425.582 1369.76 440.222 1359.73 450.943C1352.21 458.989 1337.71 459.335 1327.72 457.076L1283.86 447.139L1103.09 388.255C1074.77 379.033 1048.83 371.424 1018.23 367.597L1023.03 398.399C1021.09 438.47 986.914 457.398 986.407 466.851C986.269 469.433 990.581 472.822 993.487 475.289L1078.49 502.748C1109.2 514.184 1138.7 525.458 1167.98 539.983C1203.22 557.459 1236.5 574.198 1270.37 594.556C1329.71 630.222 1389.2 662.8 1446 704L1245.12 585.034C1176.75 544.548 1106 513.838 1029.55 492.051L989.889 478.102C986.753 476.995 981.818 471.693 981.518 468.58C980.158 455.369 1016.11 438.769 1018.55 398.353C1019.2 387.748 1010.25 374.998 1015.76 367.159C1017.15 365.176 1023.37 362.871 1026.14 363.539L1078.56 375.966L1275.1 439.622L1323.13 452.142C1334.39 455.07 1345.25 454.977 1356.76 448.222C1340.5 436.164 1321.96 431.069 1301.83 426.665C1236.52 412.417 1173.54 396.186 1110.26 374.214C1082.89 364.715 1056.74 354.732 1033.31 338.017C993.948 309.958 970.726 268.666 956.821 223.085C948.219 194.888 933.875 170.911 919.025 145.342C907.333 135.636 893.059 136.396 886.44 130.586C882.105 126.782 892.298 117.007 883.004 108.591C880.56 106.378 878.254 104.372 878.9 102.943L882.197 95.6804L841.242 127.082L844.54 109.099C826.207 92.9368 803.861 77.9507 781.516 66.884C768.233 60.3132 754.535 64.9935 748.355 77.7662C732.351 110.828 741.898 134.69 713.372 153.619C730.645 165.262 751.837 169.389 770.17 164.132C776.604 157.953 783.361 152.259 791.04 147.463L824.8 126.344C826.53 125.261 833.771 124.984 833.517 126.967L832.341 136.258L772.753 170.726C780.363 181.055 789.425 189.585 800.379 195.949L860.912 146.402C872.489 136.927 884.296 136.097 898.455 140.777C909.132 144.304 918.148 150.276 920.869 162.472C925.551 183.453 919.555 203.419 909.155 222.094C903.597 232.1 896.933 241.576 884.964 245.288C927.05 266.96 964.177 307.791 994.224 347.124C1017.47 378.802 1012.58 422.169 979.351 444.695C968.143 462.286 972.824 480.408 949.234 477.572C924.674 474.621 902.421 462.609 883.696 446.055C863.91 428.556 846.269 410.342 828.42 390.653C822.863 384.52 815.945 376.543 807.32 374.975C770.77 368.335 738.485 375.344 725.502 355.355C715.171 339.423 703.802 304.679 718.838 300.436V300.529ZM1006.08 8.94554C992.91 11.643 983.179 18.3061 973.032 25.6377C943.007 47.333 914.136 68.3365 884.964 94.2048C923.637 70.8957 969.804 41.3846 1006.08 8.92248V8.94554ZM891.883 111.381L911.576 97.8015C951.286 74.0543 988.183 50.0535 1026.46 23.1247L1014.7 8.25387C994.755 25.8222 976.491 39.7477 955.345 53.996L884.688 101.629C885.818 104.672 889.969 110.321 891.859 111.404L891.883 111.381ZM910.654 116.292C951.471 94.5045 989.013 72.3713 1026.56 46.9641C1029.14 45.2349 1032.46 40.0705 1033.13 37.4422C1033.8 34.8138 1030.68 29.1883 1028.28 27.2977C992.449 52.336 957.812 75.6912 920.662 97.4787C910.492 103.45 902.721 109.053 892.413 118.044C898.339 120.05 904.635 119.497 910.654 116.292ZM880.398 234.567C880.814 236.434 884.503 239.639 886.256 239.87C898.639 241.483 934.936 176.259 909.8 152.189C902.813 145.503 884.203 139.186 874.864 143.959C857.084 153.042 843.94 166.184 829.435 179.395L851.181 170.426C857.338 168.559 866.009 171.833 867.646 178.519L872.604 198.785L880.375 234.544L880.398 234.567ZM724.118 201.021L737.194 185.044C728.085 178.196 716.347 165.193 703.087 164.247C692.318 163.487 682.172 177.343 680.604 186.911C679.681 192.444 683.97 200.883 686.945 204.456C700.435 194.174 714.825 212.387 724.118 201.021ZM999.759 410.48C1008.22 393.096 1005.04 372.623 994.086 356.092C971.072 321.371 941.624 290.822 908.371 265.046C872.374 237.149 813.062 231.546 815.391 190.646C810.964 194.312 801.002 201.044 796.159 198.462C783.176 191.568 774.275 181.793 767.656 170.703C750.269 171.694 735.695 169.066 718.399 164.109L741.575 182.046C757.763 176.098 777.987 189.908 793.853 202.289C797.796 205.355 801.232 215.5 802.616 220.042C809.695 219.834 817.697 221.033 823.624 224.953C837.967 234.405 851.734 241.668 867.462 248.17C879.615 253.196 889.092 261.058 898.639 270.026C940.978 309.797 996.323 353.971 999.759 410.503V410.48ZM879.661 242.705C867.162 220.111 872.35 194.081 860.521 176.19C850.674 171.717 823.647 186.473 820.903 196.387C815.876 214.601 856.669 233.299 879.661 242.705ZM989.405 382.721C978.889 359.505 964.315 338.893 946.167 321.509L897.832 275.26C886.048 263.963 874.495 255.34 859.16 249.23C823.947 235.189 808.727 210.843 793.276 233.299C789.471 238.832 779.164 244.826 773.029 240.331C773.606 226.405 793.507 226.474 797.104 219.788C801.901 210.912 770.055 186.104 746.718 183.845C740.307 205.517 724.995 221.517 702.165 219.396C714.318 238.025 732.605 249.138 753.313 256.4C806.628 275.052 831.119 325.797 852.519 375.666C864.095 402.641 880.998 422.423 908.832 432.982C938.049 444.072 966.183 454.516 983.524 432.544C994.962 418.066 997.868 401.489 989.382 382.721H989.405ZM703.618 206.969L692.895 205.817C701.911 217.483 715.056 216.238 725.018 209.298C716.393 209.09 711.527 207.822 703.618 206.969ZM406.231 310.973C421.474 307.491 429.799 296.171 426.132 280.586C417.738 244.85 380.957 208.86 344.337 212.48C331.562 235.95 317.126 262.233 329.694 283.398C343.392 306.477 377.291 317.59 406.231 310.973ZM679.035 250.406C679.035 240.953 678.736 235.65 676.568 225.944C663.447 233.737 657.128 239.501 649.979 248.861C661.902 242.613 667.99 241.115 679.058 250.429L679.035 250.406ZM678.136 257.161C672.371 251.951 669.073 248.953 666.468 247.755C659.388 244.504 637.988 268.481 626.319 284.113C646.636 277.173 661.879 268.205 678.136 257.161ZM766.342 293.012C756.726 277.98 743.789 271.617 730.852 264.7C720.636 260.066 711.366 255.916 699.075 259.743L723.473 283.675C734.219 294.211 751.814 298.822 766.342 293.012ZM811.31 334.051C808.45 315.054 769.04 308.898 744.02 309.497L787.004 319.572C796.482 321.786 804 327.55 811.31 334.028V334.051ZM817.444 357.937L807.966 339.354C803.215 338.662 793.922 338.593 789.033 339.723C782.277 341.268 780.57 356.208 786.082 358.905C795.998 363.77 807.159 362.502 817.444 357.914V357.937Z"

const LAPTOP_PATH = "M1323 413.608V419.449L1115.37 419.495C1092.59 432.86 1066.89 435.588 1042.11 426.587C1040.42 420.222 1046.72 414.699 1053.58 414.517L1113.4 412.926C1113.76 392.559 1124.28 375.079 1126.89 357.417C1130.03 336.119 1121.89 309.66 1140.34 292.362C1143.05 289.816 1150.45 286.498 1153.93 286.679C1169.69 287.566 1154 335.232 1136.82 364.668C1159.88 347.166 1177.3 288.793 1161.58 282.088C1157.54 280.36 1147.16 280.951 1143.66 283.679L1126.82 296.772L1138.02 245.469C1118.96 253.743 1106.35 258.971 1087.98 258.948L1058.42 258.902L1004.78 252.924C1003.6 261.471 1003.62 273.655 1004.62 283.883L1007.82 316.752C1011.03 349.575 1016.75 380.284 1029.02 410.766C1031.02 415.767 1031.02 422.836 1028.52 428.246L954.048 427.178C933.465 426.882 917.358 419.017 903.022 404.106L896.706 428.36L805.332 428.905L763.53 430.837C758.895 475.117 715.366 489.369 670.315 491.528C588.164 495.483 537.206 441.203 504.832 498.848L547.043 483.277C620.311 488.846 691.307 499.529 761.599 519.055C774.503 522.647 787.452 525.624 795.199 539.899L608.384 508.167C591.14 505.235 573.192 502.348 555.881 502.689C542.454 502.962 500.811 524.556 497.789 528.102C496.29 529.852 497.516 535.285 498.607 539.104C563.741 555.492 627.24 569.063 693.76 582.087C735.654 578.814 771.436 564.312 804.832 538.922L802.469 567.767C769.164 580.519 735.29 608.478 696.737 605.75C639.94 601.749 585.324 583.747 529.822 571.881L444.287 553.583C439.22 530.307 460.78 516.35 487.066 509.031C487.838 489.755 499.584 474.094 516.396 465.32C534.389 455.909 552.2 455.796 571.67 462.319C614.518 476.708 660.228 484.141 704.256 474.298C727.611 469.07 748.058 455.068 751.352 431.11L686.468 432.679L521.826 435.452C478.456 436.179 393.601 443.635 384.037 427.791C380.72 422.291 380.583 413.744 381.174 402.924L320.924 414.539C306.202 417.381 291.254 426.678 275.237 427.2L217.94 429.064C215.623 429.133 210.261 430.974 208.285 432.224C206.308 433.474 205.241 440.316 205.695 442.657C212.738 478.958 175.57 485.55 136.38 497.029C96.4635 508.735 57.7282 519.442 19.3563 535.694L0 545.923V540.808C13.9493 532.534 29.1254 524.465 46.7096 519.01L180.841 477.435C212.193 467.706 196.04 433.11 204.491 427.951C207.035 426.405 213.556 425.064 217.032 424.882L244.362 423.495C266.149 422.382 285.869 421.018 306.293 414.608L239.137 412.494C226.846 412.107 210.511 404.788 204.286 395.014C189.656 372.101 220.099 338.914 190.814 341.028L149.966 343.961C125.657 345.711 102.507 347.825 74.9944 337.005C92.9194 319.662 114.411 319.321 137.198 314.729C156.35 310.888 177.615 317.207 196.04 321.23C218.804 295.408 254.449 313.229 303.908 294.158C314.131 290.225 323.787 297.522 327.172 307.637C333.919 300.045 346.028 297.636 355.048 291.976C381.288 275.496 399.167 250.469 419.251 225.557L338.236 190.733C337.531 186.801 343.711 177.731 347.573 176.64C377.153 191.483 404.438 202.803 434.359 214.328C441.333 203.962 448.898 191.642 459.781 188.756C476.752 184.232 493.882 194.802 509.08 202.417C512.102 193.961 517.441 187.505 524.688 186.346C533.139 184.982 543.522 190.097 542.749 198.893C539.796 232.649 564.673 224.852 555.449 245.537C576.555 250.879 589.641 268.017 584.37 288.793L627.899 320.798C608.565 331.845 593.003 322.116 580.281 310.524L567.899 323.208C553.813 337.642 530.322 348.757 511.307 333.686L558.153 320.503C560.061 319.957 564.037 316.116 565.241 314.934C571.92 308.342 531.39 303.409 509.148 334.709C479.546 376.397 440.879 406.606 387.967 405.129C385.241 409.016 384.923 419.995 387.626 423.836C389.943 427.155 398.054 431.519 402.461 431.451L530.572 429.678L701.053 427.087L750.307 424.677C748.672 421.745 741.697 416.335 738.198 416.381L565.991 418.017C530.436 418.358 462.121 424.177 457.691 413.653C452.965 402.469 478.524 380.034 494.813 364.646L528.823 361.031L573.261 358.713C621.583 356.19 668.997 355.803 717.206 359.213C768.096 362.827 815.805 376.466 865.718 385.626C878.577 387.99 888.869 397.537 899.615 406.061C902.841 374.215 821.78 365.873 780.932 359.054L719.433 348.78L726.975 316.934C754.465 237.763 785.112 161.501 816.6 83.9444C822.575 69.2377 829.527 60.009 845.726 56.0084L1071.5 0C1050.65 63.1913 1028.63 118.881 1004.26 176.958L946.12 315.547L908.02 399.219C924.037 425.473 959.751 421.359 993.852 423.223C1005.35 423.859 1017.14 425.45 1027.32 421.29C1004.94 365.259 997.35 302.818 999.645 246.81L1038.08 251.879C1062.87 255.152 1086.36 256.993 1111.56 249.447L1037.29 248.424L1008.94 242.991C1006.57 242.536 1002.42 237.74 1002.03 235.513C1001.64 233.285 1006.3 228.307 1008.53 227.898L1037.36 222.556C1073.73 221.783 1123.19 218.078 1135.84 235.399C1140.86 242.286 1142.45 254.788 1140.48 262.358L1135.5 281.451C1146.75 275.814 1155.36 273.837 1163.56 277.587C1186.07 287.839 1165.51 342.188 1143.02 368.419L1131.28 367.851C1128.85 367.737 1126.12 375.397 1125.6 377.807L1117.6 413.698L1323.05 413.562L1323 413.608ZM759.826 350.325C809.262 359.44 870.489 360.327 905.317 393.15C962.818 264.812 1017.09 138.498 1064.44 6.45551L858.903 57.4177C847.271 61.0319 837.706 64.6915 827.642 71.0788L744.605 281.974L724.817 343.847L759.849 350.303L759.826 350.325ZM502.81 334.209C517.418 313.82 540.546 300 565.332 306.341C567.876 308.751 573.011 312.297 574.01 310.183C590.027 276.087 516.373 286.816 507.354 252.765C512.852 251.788 525.074 252.447 530.459 255.652L579.145 284.611C583.643 257.948 559.766 250.719 532.117 243.105C502.605 234.967 505.854 216.328 481.545 205.008L499.084 203.758C489.383 199.212 473.117 188.324 459.872 194.552C450.125 199.143 442.81 210.895 434.858 220.397L343.302 183.778C363.067 200.939 423.726 214.532 422.681 226.648C421.795 236.763 382.923 277.701 363.226 294.34L332.261 309.387L380.606 312.274C396.759 282.429 418.387 256.72 441.719 231.921C463.166 209.122 483.59 206.917 485.566 214.646L488.906 227.671C489.565 230.216 495.972 233.853 495.79 236.513L495.131 246.332L507.217 262.312L515.282 274.496C517.236 277.451 512.942 285.179 510.489 289.975C508.49 293.862 509.603 302.295 509.58 308.887C509.398 346.075 431.451 377.829 392.352 397.378C436.312 405.083 478.069 368.828 502.833 334.277L502.81 334.209ZM522.507 223.283C531.549 231.603 541.114 239.081 553.95 236.149C538.319 226.261 535.502 213.009 537.91 198.757C538.092 194.87 529.027 189.756 525.506 191.188C522.416 192.438 515.532 199.075 516.646 200.553L533.435 215.487C522.575 214.191 516.441 211.577 505.763 207.849L522.552 223.283H522.507ZM504.105 308.796C502.833 295.863 503.946 290.112 510.534 277.223L496.085 256.334C495.108 254.902 487.906 254.243 488.225 252.538L489.769 244.241C490.133 242.264 491.11 235.285 489.179 235.399L479.523 235.99L482.681 215.987C468.278 215.669 459.281 221.965 449.989 231.489C424.408 257.63 400.121 285.406 383.332 318.843C366.521 316.593 347.528 316.138 331.693 316.638L337.713 358.667C339.962 374.397 332.443 392.832 327.285 407.879L384.287 396.878L416.115 379.807C444.605 364.532 506.877 336.869 504.105 308.819V308.796ZM1132.55 241.741C1126.14 231.353 1116.56 228.557 1108.04 228.512L1034.52 228.125C1026.5 228.08 1016.73 231.239 1006.96 235.126C1015.21 239.672 1025.34 243.15 1034.68 243.036L1132.57 241.741H1132.55ZM1155.18 294.544C1138.77 286.498 1125.57 326.731 1134.57 354.258C1147.09 336.687 1154.47 316.343 1155.18 294.544ZM615.404 318.616C603.59 308.342 592.571 300.477 581.099 295.272C583.052 314.752 600.137 320.571 615.404 318.616ZM194.881 335.505C198.334 335.3 205.763 338.028 207.512 340.619C215.055 351.826 200.515 370.692 207.308 389.172C211.102 399.469 227.459 407.175 238.614 407.22L319.697 407.425C338.622 379.171 333.283 339.369 321.333 306.864C314.926 289.43 295.025 306.637 265.013 308.66L229.799 311.047C215.441 312.024 204.196 316.297 199.084 331.345C167.641 311.433 123.726 318.798 85.3995 334.096C109.527 343.938 131.837 339.255 155.896 337.801L194.881 335.482V335.505ZM757.668 424.609C757.827 416.722 755.419 410.607 757.691 410.516L767.255 410.107L802.447 408.629L889.936 405.925C877.1 392.968 862.947 389.036 846.862 386.626C805.309 380.398 765.143 367.919 722.795 365.1C666.862 361.395 612.155 364.009 555.858 364.123L528.777 366.623C520.008 367.441 503.151 367.146 496.562 371.442C480.841 382.239 469.436 395.332 460.667 413.085C513.033 413.653 560.538 412.766 610.224 412.13L732.291 410.584C744.014 410.425 751.761 415.471 757.645 424.655L757.668 424.609ZM808.808 423.654C834.662 422.336 862.083 422.336 886.301 423.882C888.528 424.018 894.775 422.472 894.435 420.609L892.731 411.471L823.257 413.63L763.234 414.38L764.438 425.905L808.808 423.654ZM1102.04 420.449L1054.53 419.177C1053.53 419.154 1048.49 424.336 1049.49 424.45L1055.42 425.2C1072.12 427.314 1088.32 425.677 1102.04 420.449ZM502.855 546.15C497.267 544.945 490.792 537.217 491.087 532.807C492.109 517.328 547.293 496.074 558.221 496.938L582.144 498.802L776.684 531.33C750.012 518.919 722 513.804 692.579 508.599C645.052 500.189 598.41 490.869 549.588 490.051C530.936 489.733 515.873 505.053 496.653 507.849L502.151 487.573C494.563 490.915 493.268 503.826 493.995 512.054C470.845 519.328 448.24 527.329 449.035 548.923L591.322 580.928L696.737 603.272C729.701 596.339 758.304 584.679 787.452 569.017C794.654 566.199 799.789 560.061 798.948 550.219C767.551 570.358 734.768 584.383 696.782 588.134L502.878 546.196L502.855 546.15Z"

export default function Home() {
  // Scene 1
  const arcRef = useRef(null)
  const charsRef = useRef([])
  // Scene 2
  const scene1Ref = useRef(null)
  const scene2Ref = useRef(null)
  const handStrokeRef = useRef(null)
  const handFillRef = useRef(null)
  // Scene 3
  const scene3Ref = useRef(null)
  const laptopStrokeRef = useRef(null)
  const laptopFillRef = useRef(null)
  const s3CharsRef = useRef([])
  // Scene 4
  const scene4Ref = useRef(null)
  const endSvgRef = useRef(null)
  const s4CharsRef = useRef([])

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    // --- Pre-init Scene 2 ---
    const handStroke = handStrokeRef.current
    const handFill = handFillRef.current
    let handTl = null
    if (handStroke && handFill) {
      const len = handStroke.getTotalLength()
      gsap.set(handStroke, { strokeDasharray: len, strokeDashoffset: len })
      gsap.set(handFill, { opacity: 0 })
      handTl = gsap.timeline({ paused: true })
      handTl
        .to(handStroke, { strokeDashoffset: 0, ease: 'none', duration: 2 }, 0)
        .to(handFill, { opacity: 1, ease: 'power1.in', duration: 0.5 }, 2)
    }

    // --- Pre-init Scene 3 ---
    const laptopStroke = laptopStrokeRef.current
    const laptopFill = laptopFillRef.current
    const s3Chars = s3CharsRef.current.filter(Boolean)
    let s3Tl = null
    if (laptopStroke && laptopFill && s3Chars.length) {
      const laptopLen = laptopStroke.getTotalLength()
      gsap.set(laptopStroke, { strokeDasharray: laptopLen, strokeDashoffset: laptopLen })
      gsap.set(laptopFill, { opacity: 0 })
      gsap.set(s3Chars, { opacity: 0 })
      // Text spans full 2.5s (stroke 0-2s + fill 2-2.5s) so everything completes together
      const s3Stagger = (2.5 - CHAR_FADE) / (s3Chars.length - 1)
      s3Tl = gsap.timeline({ paused: true })
      s3Tl
        .to(s3Chars, { opacity: 1, duration: CHAR_FADE, stagger: s3Stagger, ease: 'none' }, 0)
        .to(laptopStroke, { strokeDashoffset: 0, ease: 'none', duration: 2 }, 0)
        .to(laptopFill, { opacity: 1, ease: 'power1.in', duration: 0.5 }, 2)
    }

    // --- Pre-init Scene 4 ---
    const endSvgEl = endSvgRef.current
    const s4Chars = s4CharsRef.current.filter(Boolean)
    let s4Tl = null
    if (endSvgEl && s4Chars.length) {
      gsap.set(s4Chars, { opacity: 0 })
      gsap.set(endSvgEl, { y: 120, opacity: 0 })
      const s4Stagger = (2.5 - CHAR_FADE) / (s4Chars.length - 1)
      s4Tl = gsap.timeline({
        paused: true,
        onComplete: () => {
          document.body.style.overflow = ''
          window.removeEventListener('wheel', onWheel)
        },
      })
      s4Tl
        .to(s4Chars, { opacity: 1, duration: CHAR_FADE, stagger: s4Stagger, ease: 'none' }, 0)
        .to(endSvgEl, { y: 0, opacity: 1, duration: 1.8, ease: 'power2.out' }, 0)
    }

    // --- Scene transition system ---
    const sceneEls = [scene1Ref.current, scene2Ref.current, scene3Ref.current, scene4Ref.current]

    const handProxy = { p: 0 }
    let handTarget = 0
    const s3Proxy = { p: 0 }
    let s3Target = 0
    // Total scroll pixels needed to drive animation 0→1 (same "effort" for mouse & touchpad)
    const SCROLL_DISTANCE = 600
    // Per-event cap: prevents a single fast-swipe event from jumping too far
    const MAX_STEP = 0.1
    const SCRUB = 0.5

    let current = 0
    let busy = false
    let cooldownUntil = 0
    let fadeOutEl = null
    let fadeOutTimer = null

    gsap.set(sceneEls[0], { zIndex: 1 })

    function clearFadeOut(instant) {
      if (fadeOutTimer) { clearTimeout(fadeOutTimer); fadeOutTimer = null }
      if (!fadeOutEl) return
      const el = fadeOutEl
      fadeOutEl = null
      if (instant) {
        gsap.set(el, { opacity: 0, zIndex: 0 })
      } else {
        gsap.to(el, { opacity: 0, duration: 0.4, overwrite: true,
          onComplete: () => gsap.set(el, { zIndex: 0 }) })
      }
    }

    function stepFadeOut(p) {
      if (!fadeOutEl) return
      const t = Math.min(1, p / 0.25)
      if (t >= 1) {
        clearFadeOut(true)
      } else {
        gsap.set(fadeOutEl, { opacity: 1 - t })
      }
    }

    function transitionTo(next) {
      if (busy || next === current || next < 0 || next >= sceneEls.length) return
      busy = true

      clearFadeOut(true)

      const forward = next > current

      if (current === 1) gsap.killTweensOf(handProxy)
      if (current === 2) gsap.killTweensOf(s3Proxy)
      if (current === 3) {
        s4Tl?.progress(0).pause()
        gsap.set(s4Chars, { opacity: 0 })
        gsap.set(endSvgEl, { y: 120, opacity: 0 })
      }

      if (next === 1) {
        handTarget = forward ? 0 : 1
        handProxy.p = handTarget
        handTl?.progress(handTarget)
      }
      if (next === 2) {
        s3Target = forward ? 0 : 1
        s3Proxy.p = s3Target
        s3Tl?.progress(s3Target)
      }
      if (next === 3) {
        s4Tl?.progress(0).pause()
        gsap.set(s4Chars, { opacity: 0 })
        gsap.set(endSvgEl, { y: 120, opacity: 0 })
      }

      const from = sceneEls[current]
      const to = sceneEls[next]

      if (forward) {
        // Yangi scene orqada darhol ko'rinadi, eski scene scroll bilan so'nadi
        gsap.set(to, { opacity: 1, zIndex: 1 })
        gsap.set(from, { zIndex: 2 })
        fadeOutEl = from
        fadeOutTimer = setTimeout(() => clearFadeOut(false), 1500)
        current = next
        busy = false
        cooldownUntil = Date.now() + 600
        if (next === 3) {
          setTimeout(() => s4Tl?.play(), 150)
        }
      } else {
        // Backward: yangi sceneni darhol ko'rsatish (uning kontenti bor)
        gsap.set(to, { opacity: 1, zIndex: 2 })
        gsap.set(from, { opacity: 0, zIndex: 0 })
        gsap.set(to, { zIndex: 1 })
        current = next
        busy = false
        cooldownUntil = Date.now() + 600
      }
    }

    function driveScene2(dir, absDelta) {
      const step = Math.min(absDelta / SCROLL_DISTANCE, MAX_STEP)
      handTarget = Math.max(0, Math.min(1, handTarget + dir * step))
      // Transition only when visually complete — never based on logical target alone
      if (dir > 0 && handProxy.p >= 0.95) { transitionTo(2); return }
      if (dir < 0 && handProxy.p <= 0.05) { transitionTo(0); return }
      gsap.to(handProxy, {
        p: handTarget, duration: SCRUB, ease: 'power1.out', overwrite: true,
        onUpdate: () => {
          handTl?.progress(handProxy.p)
          stepFadeOut(handProxy.p)
        },
        onComplete: () => {
          if (handTarget >= 1) transitionTo(2)
          else if (handTarget <= 0) transitionTo(0)
        },
      })
    }

    function driveScene3(dir, absDelta) {
      const step = Math.min(absDelta / SCROLL_DISTANCE, MAX_STEP)
      s3Target = Math.max(0, Math.min(1, s3Target + dir * step))
      if (dir > 0 && s3Proxy.p >= 0.95) { transitionTo(3); return }
      if (dir < 0 && s3Proxy.p <= 0.05) { transitionTo(1); return }
      gsap.to(s3Proxy, {
        p: s3Target, duration: SCRUB, ease: 'power1.out', overwrite: true,
        onUpdate: () => {
          s3Tl?.progress(s3Proxy.p)
          stepFadeOut(s3Proxy.p)
        },
        onComplete: () => {
          if (s3Target >= 1) transitionTo(3)
          else if (s3Target <= 0) transitionTo(1)
        },
      })
    }

    function onWheel(e) {
      if (busy || Date.now() < cooldownUntil) return
      const dir = e.deltaY > 0 ? 1 : -1
      const absDelta = Math.abs(e.deltaY)
      if (current === 1) { driveScene2(dir, absDelta); return }
      if (current === 2) { driveScene3(dir, absDelta); return }
      if (dir > 0) transitionTo(current + 1)
      else transitionTo(current - 1)
    }

    // --- Scene 1 animation ---
    const arc = arcRef.current
    const chars = charsRef.current.filter(Boolean)
    if (!arc || !chars.length) return

    const arcLen = arc.getTotalLength()
    gsap.set(arc, { strokeDasharray: arcLen, strokeDashoffset: arcLen })
    gsap.set(chars, { opacity: 0 })

    const stagger = (TOTAL_DURATION - CHAR_FADE) / (chars.length - 1)

    const tl = gsap.timeline({
      onComplete: () => window.addEventListener('wheel', onWheel),
    })
    tl.to(arc, { strokeDashoffset: 0, duration: TOTAL_DURATION, ease: 'none' }, 0)
    tl.to(chars, { opacity: 1, duration: CHAR_FADE, stagger, ease: 'none' }, 0)

    return () => {
      tl.kill()
      handTl?.kill()
      s3Tl?.kill()
      s4Tl?.kill()
      clearFadeOut(true)
      document.body.style.overflow = ''
      window.removeEventListener('wheel', onWheel)
      gsap.killTweensOf([handProxy, s3Proxy])
    }
  }, [])

  return (
    <main className="bg-[#fffff6]">
      <div className="fixed inset-0 bg-[#fffff6]">

        {/* Persistent nav */}
        <nav className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-10">
          <Image src="/logo.svg" alt="Chizlab" width={210} height={48} priority />
          <div className="flex items-center">
            {navItems.map((item) => (
              <div key={item} className="flex items-center">
                <Image src="/naqsh.svg" alt="" width={22} height={22} className="opacity-60 mx-3.75" />
                <a href="#" className="text-[20px] text-[#003837] hover:opacity-70 transition-opacity">{item}</a>
              </div>
            ))}
            <Image src="/naqsh.svg" alt="" width={22} height={22} className="opacity-60 mx-3.75" />
          </div>
        </nav>

        {/* Scene 1 */}
        <div ref={scene1Ref} className="absolute inset-0 flex flex-col bg-[#fffff6]">
          <div className="flex-1 flex items-center justify-center relative overflow-hidden">
            <svg
              className="absolute bottom-[-45vw] left-1/2 -translate-x-1/2"
              style={{ width: '80vw', height: '80vw' }}
              viewBox="0 0 1000 1000"
              fill="none"
            >
              <path ref={arcRef} d="M 2 500 A 498 498 0 0 1 998 500" stroke="#B8926A" strokeWidth="2.5" fill="none" />
            </svg>
            <h1 className="relative z-10 text-center leading-none select-none text-[#003837] text-[170px]">
              <em style={{ fontFamily: 'var(--font-ppe)' }} className="italic">
                {MAIN_WORD.split('').map((char, i) => (
                  <span key={i} ref={(el) => { charsRef.current[i] = el }}>{char}</span>
                ))}
              </em>
              <span style={{ fontFamily: 'var(--font-sf)' }} className="not-italic font-normal">
                {SUFFIX.split('').map((char, i) => (
                  <span key={i} ref={(el) => { charsRef.current[MAIN_WORD.length + i] = el }}>{char}</span>
                ))}
              </span>
            </h1>
          </div>
        </div>

        {/* Scene 2 */}
        <div ref={scene2Ref} className="absolute inset-0 flex items-center justify-center bg-[#fffff6]" style={{ opacity: 0 }}>
          <svg viewBox="0 0 1446 704" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '90vw', height: 'auto', marginTop: '18vh' }}>
            <path ref={handStrokeRef} d={HAND_PATH} stroke="#B8926A" strokeWidth="2" fill="none" />
            <path ref={handFillRef} d={HAND_PATH} fill="#B8926A" opacity="0" />
          </svg>
        </div>

        {/* Scene 3 */}
        <div ref={scene3Ref} className="absolute inset-0 bg-[#fffff6]" style={{ opacity: 0 }}>
          {/* Left: text — vertically centered */}
          <div className="absolute left-0 top-0 bottom-0 w-1/2 flex flex-col justify-center pl-16" style={{ marginBottom: '12vh' }}>
            <h2
              className="text-[#003837] font-normal leading-none"
              style={{ fontFamily: 'var(--font-sf)', fontSize: '130px' }}
            >
              {S3_LINE1.split('').map((char, i) => (
                <span key={`l1-${i}`} ref={(el) => { s3CharsRef.current[i] = el }}>{char}</span>
              ))}
              <br />
              {S3_LINE2.split('').map((char, i) => (
                <span key={`l2-${i}`} ref={(el) => { s3CharsRef.current[S3_LINE1.length + i] = el }}>{char}</span>
              ))}
            </h2>
          </div>

          {/* Laptop SVG — pinned to bottom-right, stroke draws then fill fades in */}
          <svg
            viewBox="0 0 1323 606"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'absolute', bottom: 0, right: 0, width: '62vw', height: 'auto' }}
          >
            <path ref={laptopStrokeRef} d={LAPTOP_PATH} stroke="#B8926A" strokeWidth="1.5" fill="none" />
            <path ref={laptopFillRef} d={LAPTOP_PATH} fill="#B8926A" opacity="0" />
          </svg>
        </div>

        {/* Scene 4 */}
        <div ref={scene4Ref} className="absolute inset-0 bg-[#fffff6]" style={{ opacity: 0 }}>
          {/* Title */}
          <div className="absolute top-0 left-0 right-0 flex justify-center" style={{ paddingTop: '14vh' }}>
            <h2
              className="text-[#003837] font-normal leading-none text-center select-none whitespace-nowrap"
              style={{ fontSize: '100px' }}
            >
              {S4_PART1.split('').map((char, i) => (
                <span key={`s4p1-${i}`} ref={(el) => { s4CharsRef.current[i] = el }} style={{ fontFamily: 'var(--font-sf)' }}>
                  {char}
                </span>
              ))}
              <em style={{ fontFamily: 'var(--font-ppe)' }}>
                {S4_ITALIC.split('').map((char, i) => (
                  <span key={`s4it-${i}`} ref={(el) => { s4CharsRef.current[S4_PART1.length + i] = el }}>
                    {char}
                  </span>
                ))}
              </em>
              {S4_PART2.split('').map((char, i) => (
                <span key={`s4p2-${i}`} ref={(el) => { s4CharsRef.current[S4_PART1.length + S4_ITALIC.length + i] = el }} style={{ fontFamily: 'var(--font-sf)' }}>
                  {char}
                </span>
              ))}
            </h2>
          </div>

          {/* Illustration — slides in from bottom */}
          <div ref={endSvgRef} className="absolute bottom-0 left-0 right-0">
            <img src="/end.svg" alt="" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        </div>

      </div>
    </main>
  )
}
